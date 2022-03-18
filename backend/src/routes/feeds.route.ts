import { Router } from "express";
import { check } from "express-validator";

import { addFeed, deleteFeed, getFeed, getFeeds, getImage, updateFeed, uploadImage } from "../controllers/feeds.controller";
import db_check_connection from "../middlewares/check_conn";
import fieldsValidation from "../middlewares/fields_validation";
import { fileValidation } from "../middlewares/file_validation";
const router = Router();

router.get('/', [
    db_check_connection,
], getFeeds);

router.get('/:id', [
    check('id').not().isEmpty().withMessage({ msg: 'The id is required', msg_es: 'El id es obligatorio' }),
    db_check_connection,
    fieldsValidation
], getFeed);

router.post('/', [
    check('title').not().isEmpty().withMessage({ msg: 'The title is required', msg_es: 'El id es obligatorio' }),
    check('description').not().isEmpty().withMessage({ msg: 'The description is required', msg_es: 'La descripción es obligatoria' }),
    check('idWorkflow').not().isEmpty().withMessage({ msg: 'The workflow is required', msg_es: 'La workflow es obligatoria' }),
    check('idAssignees').not().isEmpty().withMessage({ msg: 'The assigneess is required', msg_es: 'La assigneess es obligatoria' }),
    db_check_connection,
    fieldsValidation
], addFeed);

router.post('/upload/:id', [
    check('id').not().isEmpty().withMessage({ msg: 'The id is required', msg_es: 'El id es obligatorio' }),
    db_check_connection,
    fileValidation,
    fieldsValidation
], uploadImage);

router.get('/image/:id', [
    check('id').not().isEmpty().withMessage({ msg: 'The id is required', msg_es: 'El id es obligatorio' }),
    db_check_connection,
    fieldsValidation
], getImage);

router.put('/:id', [
    check('id').not().isEmpty().withMessage({ msg: 'The id is required', msg_es: 'El id es obligatorio' }),
    db_check_connection,
    fieldsValidation
], updateFeed);

router.delete('/:id', [
    check('id').not().isEmpty().withMessage({ msg: 'The id is required', msg_es: 'El id es obligatorio' }),
    db_check_connection,
    fieldsValidation
], deleteFeed);

export default router;