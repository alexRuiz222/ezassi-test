"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbconfig_1 = require("../db/dbconfig");
const routes_1 = require("../routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
require('dotenv').config();
class Server {
    constructor() {
        this.api_paths = {
            feeds: '/feeds',
            workflows: '/workflows',
            assignees: '/assignees',
        };
        this.app = (0, express_1.default)();
        this.login();
    }
    async login() {
        await this.createDB();
        this.connectToDB();
        this.middlewares();
        this.routes();
        this.listen();
    }
    async createDB() {
        await (0, dbconfig_1.dbCreate)()
            .then(res => console.log(res)).catch(async (err) => {
            console.log(err);
            await new Promise(r => setTimeout(r, 5000));
            return this.createDB();
        });
    }
    async connectToDB() {
        await (0, dbconfig_1.dbConnection)()
            .then(res => console.log(res)).catch(async (err) => {
            console.log(err);
            await new Promise(r => setTimeout(r, 5000));
            return this.connectToDB();
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
        this.app.use((0, express_fileupload_1.default)());
    }
    routes() {
        this.app.use(this.api_paths.feeds, routes_1.feedsRouter);
        this.app.use(this.api_paths.workflows, routes_1.workflowsRouter);
        this.app.use(this.api_paths.assignees, routes_1.assigneesRouter);
    }
    async listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server listenning on ${process.env.PORT}`);
        });
        // console.log(this.app);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map