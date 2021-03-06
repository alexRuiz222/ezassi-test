"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.uploadImage = exports.deleteFeed = exports.updateFeed = exports.addFeed = exports.getFeed = exports.getFeeds = void 0;
const dbconfig_1 = require("../db/dbconfig");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const upploadFile_1 = require("../helpers/upploadFile");
async function base64_encode(file) {
    // read binary data
    const fs = require('fs').promises;
    const contents = await fs.readFile(file, { encoding: 'base64' });
    return contents;
    // convert binary data to base64 encoded string
    // return Buffer.from(bitmap).toString('base64');
}
const getFeeds = async (req, res) => {
    let query = [];
    let searchIn = [{}];
    let { limit = 30, from = 0, order = 'asc', order_field = 'title', search = '', search_fields = '["title"]', exceptions = '[]' } = req.query;
    limit = limit > 0 ? `LIMIT ${limit} OFFSET ${from}` : '';
    try {
        dbconfig_1.db.query(`SELECT t1.idCard, t1.title, t1.description,t1.qualification, t1.score, t1.qualification, t1.createdAt, t1.updatedAt, t2.name AS nameWorkflow, t3.name AS nameAssignees FROM  cards as t1 LEFT JOIN workflow as t2 ON t2.idWorkflow = t1.idWorkflow AND t2.status = true LEFT JOIN assignees as t3 ON t3.idAssignees = t1.idAssignees AND t3.status = true WHERE t1.status = true ${limit}  ;`, function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            return res.status(200).json({ total: results.length, feed: results });
        });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};
exports.getFeeds = getFeeds;
const getFeed = async (req, res) => {
    const { id } = req.params;
    try {
        if (isNaN(parseInt(id))) {
            return res.status(400).json([{
                    param: "_id",
                    location: "params",
                    msg: "invalid id",
                    msg_es: "id invalido"
                }]);
        }
        dbconfig_1.db.query(`SELECT * from  cards WHERE IDCard = ${id} AND status = true;`, function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            return res.status(200).json(results);
        });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};
exports.getFeed = getFeed;
const addFeed = async (req, res) => {
    const { body } = req;
    const { title, description, idWorkflow, idAssignees } = body;
    let alreadyExist = false;
    try {
        dbconfig_1.db.query(`SELECT * from  cards WHERE title LIKE '%${title}% AND status = true;'`, function (error, results, fields) {
            if (error) {
                console.log(error);
                return res.status(409).json({
                    msg: `Something went wrong`,
                    msg_es: `Algo sal??o mal`
                });
            }
            if (results.length > 0) {
                alreadyExist = true;
            }
        });
        if (alreadyExist) {
            return res.status(409).json({
                param: "title",
                location: "body",
                msg: `The Card titled ${title} already exist`,
                msg_es: `El registro ${title} ya existe`
            });
        }
        dbconfig_1.db.query(`INSERT INTO cards (title, description, idWorkflow, idAssignees) VALUES ('${title}','${description}',${idWorkflow},${idAssignees});`, function (error, results, fields) {
            if (error) {
                console.log(error);
                return res.status(409).json({
                    msg: `Something went wrong`,
                    msg_es: `Algo sal??o mal`
                });
            }
            console.log(fields);
            return res.status(201).json({ msg: 'OK', id: results.insertId });
        });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};
exports.addFeed = addFeed;
const uploadImage = async (req, res) => {
    const id = req.params.id;
    let card;
    let alreadyExist = false;
    try {
        let results = await new Promise((resolve, reject) => dbconfig_1.db.query(`SELECT * from  cards WHERE idCard = ${id} AND status = true;`, (err, results) => {
            if (err) {
                reject(err);
                return res.status(409).json({
                    msg: `Something went wrong`,
                    msg_es: `Algo sal??o mal`
                });
            }
            else {
                resolve(results);
            }
        }));
        if (results.length > 0) {
            alreadyExist = true;
            card = results[0];
        }
        if (!alreadyExist) {
            return res.status(409).json({ msg: "invalid card id", msg_es: "id del registro invalido" });
        }
        if (card.path_image) {
            const pathImagen = path_1.default.join('./data/cards/', card.path_image);
            if (fs_1.default.existsSync(pathImagen)) {
                fs_1.default.unlinkSync(pathImagen);
            }
        }
        const { name_temp } = await (0, upploadFile_1.upload_files)(req.files, undefined, 'cards', id.toString());
        dbconfig_1.db.query(`UPDATE cards SET path_image = '${name_temp}', updatedAt = CURRENT_TIMESTAMP WHERE idCard=${id};`, function (error, results, fields) {
            if (error) {
                console.log(error);
                return res.status(409).json({
                    msg: `Something went wrong`,
                    msg_es: `Algo sal??o mal`
                });
            }
            // console.log(fields);
            return res.status(201).json({ msg: 'OK', id: results.insertId });
        });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};
exports.uploadImage = uploadImage;
const getImage = async (req, res) => {
    const id = req.params.id;
    let card;
    let alreadyExist = false;
    try {
        let results = await new Promise((resolve, reject) => dbconfig_1.db.query(`SELECT * from  cards WHERE idCard = ${id} AND status = true;`, (err, results) => {
            if (err) {
                reject(err);
                return res.status(409).json({
                    msg: `Something went wrong`,
                    msg_es: `Algo sal??o mal`
                });
            }
            else {
                resolve(results);
            }
        }));
        if (results.length > 0) {
            alreadyExist = true;
            card = results[0];
        }
        if (!alreadyExist) {
            return res.status(409).json({ msg: "invalid card id", msg_es: "id del registro invalido" });
        }
        if (card.path_image) {
            const pathImagen = path_1.default.join('./data/cards/', card.path_image);
            if (fs_1.default.existsSync(pathImagen)) {
                let base64 = await base64_encode(pathImagen);
                return res.status(200).json({ msg: 'OK', base64 });
            }
        }
        return res.status(404).json({
            msg: `Image not found`,
            msg_es: `No se encontr?? la imagen`
        });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};
exports.getImage = getImage;
const updateFeed = async (req, res) => {
    const { id } = req.params;
    const { title, description, idWorkflow, idAssignees, score, qualification } = req.body;
    try {
        let results = await new Promise((resolve, reject) => dbconfig_1.db.query(`SELECT * from  cards WHERE title LIKE '%${title}%' && idCard != ${id} AND status = true;`, (err, results) => {
            if (err) {
                return res.status(409).json({
                    msg: `Something went wrong`,
                    msg_es: `Algo sal??o mal`
                });
            }
            else {
                return resolve(results);
            }
        }));
        if (results.length > 0) {
            return res.status(409).json({
                param: "title",
                location: "body",
                msg: `The Card titled ${title} already exist`,
                msg_es: `El registro ${title} ya existe`
            });
        }
        dbconfig_1.db.query(`UPDATE cards SET title = '${title}', description= '${description}', score= '${score}', qualification= '${qualification}', idWorkflow = ${idWorkflow}, idAssignees = ${idAssignees}, updatedAt = CURRENT_TIMESTAMP WHERE idCard = ${id};`, function (error, results, fields) {
            if (error) {
                console.log(error);
                return res.status(409).json({
                    msg: `Something went wrong`,
                    msg_es: `Algo sal??o mal`
                });
            }
            console.log(fields);
            return res.status(201).json({ msg: 'OK', id: results.insertId });
        });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};
exports.updateFeed = updateFeed;
const deleteFeed = async (req, res) => {
    const { id } = req.params;
    try {
        let results = await new Promise((resolve, reject) => dbconfig_1.db.query(`SELECT * from  cards WHERE idCard = ${id} AND status = true;`, (err, results) => {
            if (err) {
                // reject(err);
                return res.status(409).json({
                    msg: `Something went wrong`,
                    msg_es: `Algo sal??o mal`
                });
            }
            else {
                return resolve(results);
            }
        }));
        if (results.length == 0) {
            return res.status(409).json({
                param: "id",
                location: "body",
                msg: `The Card doesn't exists`,
                msg_es: `El registro no existe`
            });
        }
        // `DELETE FROM cards WHERE id ${id};`
        dbconfig_1.db.query(`UPDATE cards SET status = FALSE WHERE idCard = ${id};`, function (error, results, fields) {
            if (error) {
                console.log(error);
                return res.status(409).json({
                    msg: `Something went wrong`,
                    msg_es: `Algo sal??o mal`
                });
            }
            return res.status(200).json({
                msg: 'OK'
            });
        });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};
exports.deleteFeed = deleteFeed;
//# sourceMappingURL=feeds.controller.js.map