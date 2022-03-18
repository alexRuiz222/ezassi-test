"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workflows_controller_1 = require("../controllers/workflows.controller");
const check_conn_1 = __importDefault(require("../middlewares/check_conn"));
const router = (0, express_1.Router)();
router.get('/', [
    check_conn_1.default,
], workflows_controller_1.getWorkflows);
exports.default = router;
//# sourceMappingURL=workflows.route.js.map