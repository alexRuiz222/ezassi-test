import { Router } from "express";
import { check } from "express-validator";

import { getAssignees } from "../controllers/assignees.controller";
import db_check_connection from "../middlewares/check_conn";
const router = Router();

router.get('/', [
    db_check_connection,
], getAssignees);

export default router;