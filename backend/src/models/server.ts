import express, { Application } from 'express';
import cors from 'cors';
import { dbConnection, dbCreate } from '../db/dbconfig';
import { feedsRouter, workflowsRouter, assigneesRouter } from '../routes';
import fileupload from 'express-fileupload';
require('dotenv').config();


class Server {
    private app: Application;
    private api_paths = {
        feeds: '/feeds',
        workflows: '/workflows',
        assignees: '/assignees',
    };

    constructor() {
        this.app = express();
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
        await dbCreate()
            .then(res => console.log(res)).catch(
                async (err) => {
                    console.log(err);
                    await new Promise(r => setTimeout(r, 5000));
                    return this.createDB();
                }
            )
    }

    async connectToDB() {
        await dbConnection()
            .then(res => console.log(res)).catch(
                async (err) => {
                    console.log(err);
                    await new Promise(r => setTimeout(r, 5000));
                    return this.connectToDB();
                }
            )
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(fileupload());
    }

    routes() {
        this.app.use(this.api_paths.feeds, feedsRouter);
        this.app.use(this.api_paths.workflows, workflowsRouter);
        this.app.use(this.api_paths.assignees, assigneesRouter);
    }

    async listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server listenning on ${process.env.PORT}`);

        });
        // console.log(this.app);
    }
}

export default Server;