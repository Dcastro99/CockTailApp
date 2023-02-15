import * as bodyParser from "body-parser";
import express from "express";
import { APILogger } from "./logger/api.logger";
// import { TaskController } from "./controller/task.controller";
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import 'dotenv/config'

class App {

    public express: express.Application;
    public logger: APILogger;
    // public taskController: TaskController;

    /* Swagger files start */
    private swaggerFile: any = (process.cwd()+"/src/swagger/swagger.json");
    private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    private customCss: any = fs.readFileSync((process.cwd()+"/src/swagger/swagger.css"), 'utf8');
    private swaggerDocument = JSON.parse(this.swaggerData);
    /* Swagger files end */


    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new APILogger();
        // this.taskController = new TaskController();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        // this.express.get('/api/tasks', (req, res) => {
        //     this.taskController.getTasks().then(data => res.json(data));
        // });
        
        // this.express.post('/api/task', (req, res) => {
        //     console.log(req.body);
        //     this.taskController.createTask(req.body.task).then(data => res.json(data));
        // });
        
        // this.express.put('/api/task', (req, res) => {
        //     this.taskController.updateTask(req.body.task).then(data => res.json(data));
        // });
        
        // this.express.delete('/api/task/:id', (req, res) => {
        //     this.taskController.deleteTask(req.params.id).then(data => res.json(data));
        // });

        this.express.get("/", (req, res, next) => {
            res.send("Typescript App works!!");
        });

        this.express.post("/login", (req, res, next) => {
            if (req.body.loginObject?.email && req.body.loginObject?.password) {
                res.status(200);
                return res.send("We Got an Email and Password");
            }
            res.status(422);
            return res.send("Invalid Login Credentials");
        });


        // swagger docs
        this.express.use('/api/docs', swaggerUi.serve,
            swaggerUi.setup(this.swaggerDocument, this.customCss));

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;