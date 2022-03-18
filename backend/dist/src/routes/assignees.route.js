"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assignees_controller_1 = require("../controllers/assignees.controller");
const check_conn_1 = __importDefault(require("../middlewares/check_conn"));
const router = (0, express_1.Router)();
router.get('/', [
    check_conn_1.default,
], assignees_controller_1.getAssignees);
exports.default = router;
//# sourceMappingURL=assignees.route.js.map