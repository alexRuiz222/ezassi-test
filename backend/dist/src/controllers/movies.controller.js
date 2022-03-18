"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.addMovie = exports.getMovie = exports.getMovies = void 0;
const models_1 = require("../models");
const conversors_1 = require("../helpers/conversors");
const ObjectID = require('mongodb').ObjectID;
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = [];
    let searchIn = [{}];
    let { limit = 30, from = 0, order = 'asc', order_field = 'name', search = '', search_fields = '["name"]', exceptions = '[]' } = req.query;
    search_fields = JSON.parse(search_fields);
    if (!Array.isArray(search_fields)) {
        search_fields = [search_fields];
    }
    if (ObjectID.isValid(search) && JSON.parse(search_fields).some((r) => ["_id"].indexOf(r) >= 0)) {
        if ((String)(new ObjectID(search)) === search) {
            searchIn = yield (0, conversors_1.arrayToArrayObject)(JSON.parse(search_fields), search);
        }
    }
    else if (search != '') {
        const search_converted = (yield (0, conversors_1.diacriticSensitiveRegex)(search)).replace(/['"]+/g, '');
        const expression = new RegExp(search_converted, 'i');
        searchIn = yield (0, conversors_1.arrayToArrayObject)(search_fields, expression);
    }
    query = {
        _id: { $nin: JSON.parse(exceptions) },
        $and: [
            { status: true }
        ],
        $or: searchIn
    };
    try {
        const [total, movies] = yield Promise.all([models_1.MovieSchema.countDocuments(query),
            models_1.MovieSchema.find(query)
                .sort({ [order_field]: order })
                .skip(Number(from))
                .limit(Number(limit))
                .collation({ locale: "es", strength: 3 })
        ]);
        return res.status(200).json({
            total, movies
        });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
});
exports.getMovies = getMovies;
const getMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const id = new ObjectID(_id);
    try {
        const [movie] = yield Promise.all([
            models_1.MovieSchema.findOne({ status: true, _id: id })
                .collation({ locale: "es", strength: 3 })
        ]);
        if (!movie || !movie.status) {
            return res.status(400).json([{
                    param: "_id",
                    location: "params",
                    msg: "invalid id",
                    msg_es: "id invalido"
                }]);
        }
        return res.status(200).json(movie);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
});
exports.getMovie = getMovie;
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { name } = body;
    const alreadyExist = yield models_1.MovieSchema.find({ name: new RegExp('^' + name + '$', 'i'), status: true });
    if (alreadyExist) {
        return res.status(409).json({
            param: "name",
            location: "body",
            msg: `The movie named ${name} already exist`,
            msg_es: `La película ${name} ya existe`
        });
    }
    const data = {
        name
    };
    const movie = new models_1.MovieSchema(data);
    yield movie.save();
    res.status(201).json(movie);
});
exports.addMovie = addMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let { body } = req.body;
    const movie = yield models_1.MovieSchema.findByIdAndUpdate(id, body, { new: true });
    if (!movie) {
        return res.status(404).json({
            param: "id",
            location: "params",
            msg: `The movie with the ID ${id} doesn't exist`,
            msg_es: `La película con el ID: ${id} no existe`
        });
    }
    res.status(200).json(movie);
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const movie = yield models_1.MovieSchema.findOneAndUpdate({ _id: id, status: true }, { status: false }, { new: true });
    if (!movie) {
        return res.status(404).json({
            param: "id",
            location: "params",
            msg: `The movie with the ID ${id} doesn't exist`,
            msg_es: `La película con el ID: ${id} no existe`
        });
    }
    res.status(200).json({
        msg: 'The movie has been succesfully deleted',
        msg_es: "La película se ha eliminado exitosamente"
    });
});
exports.deleteMovie = deleteMovie;
// export { getMovies, getMovie, addMovie, updateMovie, deleteMovie };
//# sourceMappingURL=movies.controller.js.map