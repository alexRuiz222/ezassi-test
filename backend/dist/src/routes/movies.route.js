"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const movies_controller_1 = require("../controllers/movies.controller");
const check_conn_1 = __importDefault(require("../middlewares/check_conn"));
const router = (0, express_1.Router)();
router.get('/', [
    check_conn_1.default,
], movies_controller_1.getMovies);
router.get('/:id', [
    check_conn_1.default,
], movies_controller_1.getMovie);
router.post('/', [
    (0, express_validator_1.check)('name').optional().not().isEmpty().withMessage({ msg: 'The name is required', msg_es: 'El nombre es obligatorio' }),
    check_conn_1.default,
], movies_controller_1.addMovie);
router.patch('/', [
    check_conn_1.default,
], movies_controller_1.updateMovie);
router.delete('/:id', [
    check_conn_1.default,
], movies_controller_1.deleteMovie);
exports.default = router;
//# sourceMappingURL=movies.route.js.map