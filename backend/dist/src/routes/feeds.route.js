"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const feeds_controller_1 = require("../controllers/feeds.controller");
const check_conn_1 = __importDefault(require("../middlewares/check_conn"));
const fields_validation_1 = __importDefault(require("../middlewares/fields_validation"));
const file_validation_1 = require("../middlewares/file_validation");
const router = (0, express_1.Router)();
router.get('/', [
    check_conn_1.default,
], feeds_controller_1.getFeeds);
router.get('/:id', [
    (0, express_validator_1.check)('id').not().isEmpty().withMessage({ msg: 'The id is required', msg_es: 'El id es obligatorio' }),
    check_conn_1.default,
    fields_validation_1.default
], feeds_controller_1.getFeed);
router.post('/', [
    (0, express_validator_1.check)('title').not().isEmpty().withMessage({ msg: 'The title is required', msg_es: 'El id es obligatorio' }),
    (0, express_validator_1.check)('description').not().isEmpty().withMessage({ msg: 'The description is required', msg_es: 'La descripción es obligatoria' }),
    (0, express_validator_1.check)('idWorkflow').not().isEmpty().withMessage({ msg: 'The workflow is required', msg_es: 'La workflow es obligatoria' }),
    (0, express_validator_1.check)('idAssignees').not().isEmpty().withMessage({ msg: 'The assigneess is required', msg_es: 'La assigneess es obligatoria' }),
    check_conn_1.default,
    fields_validation_1.default
], feeds_controller_1.addFeed);
router.post('/upload/:id', [
    (0, express_validator_1.check)('id').not().isEmpty().withMessage({ msg: 'The id is required', msg_es: 'El id es obligatorio' }),
    check_conn_1.default,
    file_validation_1.fileValidation,
    fields_validation_1.default
], feeds_controller_1.uploadImage);
router.get('/image/:id', [
    (0, express_validator_1.check)('id').not().isEmpty().withMessage({ msg: 'The id is required', msg_es: 'El id es obligatorio' }),
    check_conn_1.default,
    fields_validation_1.default
], feeds_controller_1.getImage);
router.put('/:id', [
    (0, express_validator_1.check)('id').not().isEmpty().withMessage({ msg: 'The id is required', msg_es: 'El id es obligatorio' }),
    check_conn_1.default,
    fields_validation_1.default
], feeds_controller_1.updateFeed);
router.delete('/:id', [
    (0, express_validator_1.check)('id').not().isEmpty().withMessage({ msg: 'The id is required', msg_es: 'El id es obligatorio' }),
    check_conn_1.default,
    fields_validation_1.default
], feeds_controller_1.deleteFeed);
exports.default = router;
//# sourceMappingURL=feeds.route.js.map