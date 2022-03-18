import { Router } from "express";
import { check } from "express-validator";

import { getWorkflows } from "../controllers/workflows.controller";
import db_check_connection from "../middlewares/check_conn";
const router = Router();

router.get('/', [
    db_check_connection,
], getWorkflows);

export default router;