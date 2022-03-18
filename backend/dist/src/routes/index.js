"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assigneesRouter = exports.workflowsRouter = exports.feedsRouter = void 0;
const feeds_route_1 = __importDefault(require("./feeds.route"));
exports.feedsRouter = feeds_route_1.default;
const workflows_route_1 = __importDefault(require("./workflows.route"));
exports.workflowsRouter = workflows_route_1.default;
const assignees_route_1 = __importDefault(require("./assignees.route"));
exports.assigneesRouter = assignees_route_1.default;
//# sourceMappingURL=index.js.map