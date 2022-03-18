"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.dbConnection = exports.dbCreate = void 0;
const mysql = require('mysql');
//CREATE DB
const dbname = 'ezassi';
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});
const dbCreate = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await con.connect(function (err) {
                if (err)
                    return reject({ msg: `Error creating to database`, msg_es: `Error al creando a la base de datos` });
                console.log("Connected!");
                con.query(`CREATE DATABASE IF NOT EXISTS ${dbname}`, function (err, result) {
                    if (err)
                        throw err;
                    return resolve(`DB created`);
                });
            });
        }
        catch (err) {
            return reject({ msg: `Error creating to database`, msg_es: `Error al creando a la base de datos` });
        }
    });
};
exports.dbCreate = dbCreate;
const db = mysql.createConnection({
    multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: '',
    database: `${dbname}`
});
exports.db = db;
const dbConnection = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.connect(function (err) {
                if (err) {
                    console.log(err);
                    return reject({ msg: `Error connecting to database`, msg_es: `Error al conectar a la base de datos` });
                }
                db.query('CREATE TABLE IF NOT EXISTS `workflow` (`idWorkflow` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT, `name` VARCHAR(50) ,`description` TEXT, `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, `status` TINYINT(1) NOT NULL DEFAULT TRUE, PRIMARY KEY (`idWorkflow`))ENGINE=InnoDB ;', function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        return;
                    }
                });
                db.query('CREATE TABLE IF NOT EXISTS `assignees` (`idAssignees` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT, `name`VARCHAR(50), `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, `status` TINYINT(1) NOT NULL DEFAULT TRUE, PRIMARY KEY (`idAssignees`))ENGINE=InnoDB ;', function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        return;
                    }
                });
                db.query('CREATE TABLE IF NOT EXISTS `cards` (`idCard` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,`title` VARCHAR(50),`description` TEXT,`idWorkflow` SMALLINT UNSIGNED,`idAssignees` SMALLINT UNSIGNED, `score` TINYINT(5) NOT NULL DEFAULT 0,`path_image` VARCHAR(150),`qualification` TINYINT(5) NOT NULL DEFAULT 0  , `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, `status` TINYINT(1) NOT NULL DEFAULT TRUE, PRIMARY KEY (`idCard`),KEY `FKey-Assignees_idAssignees` (`idAssignees`),CONSTRAINT `FKey-Assignees_idAssignees` FOREIGN KEY (`idAssignees`)REFERENCES `assignees` (`idAssignees`)ON DELETE RESTRICT ON UPDATE CASCADE,KEY `FKey-Workflow_idWorkflow` (`idWorkflow`),CONSTRAINT `FKey-Workflow_idWorkflow` FOREIGN KEY (`idWorkflow`)REFERENCES `workflow` (`idWorkflow`)ON DELETE RESTRICT ON UPDATE CASCADE)ENGINE=INNODB;', function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        return;
                    }
                });
                //DEFAULT DATA
                db.query("INSERT IGNORE INTO `assignees` (`idAssignees`,`name`) VALUES(1,'Assignees'); INSERT IGNORE INTO `workflow` (`idWorkflow`,`name`) VALUES(1,'Idea Review/PLM II'); INSERT IGNORE INTO `cards`(`idCard`,`title`,`description`,`idWorkflow`,`idAssignees`,`score`,`qualification`,`status`) VALUES ('1', 'Idea ', 'Idea summary', '1', '1', '5', '4', '1');", function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        return;
                    }
                });
                return resolve(`DB online`);
            });
        }
        catch (err) {
            throw { msg: `Error connecting to database`, msg_es: `Error al conectar a la base de datos` };
        }
    });
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=dbconfig.js.map