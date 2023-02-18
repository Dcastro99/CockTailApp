import * as bodyParser from "body-parser";
import express from "express";
import { APILogger } from "./logger/api.logger";
import { UserController } from "./controllers/user.controller";
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import 'dotenv/config'

class App {

    public express: express.Application;
    public logger: APILogger;
    public userController: UserController;

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
        this.userController = new UserController();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.get('/api/getAllUsers', (req, res) => {
            this.userController.getUsers().then(data => {
                this.logger.info("all users?:", data)
                return res.json(data)
            });
        });
        
         this.express.post('/api/register',  (req, res) => {
            this.logger.info("req.body:", req.body);
            try {
                req.body.user = {};
                req.body.user.email = req.body.loginObject.email;
                req.body.user.password = req.body.loginObject.password;
                req.body.user.name = "name";
                this.userController.registerUser(req.body.user).then(data => {
                    res.json(data)
                    }
                );
                
            } catch (error) {
                this.logger.error(" " + error);

            }
        });
        
        // this.express.put('/api/task', (req, res) => {
        //     this.taskController.updateTask(req.body.task).then(data => res.json(data));
        // });
        
        // this.express.delete('/api/task/:id', (req, res) => {
        //     this.taskController.deleteTask(req.params.id).then(data => res.json(data));
        // });

        this.express.get("/", (req, res, next) => {
            res.send("Typescript App works!!");
        });

        this.express.post("/api/login", (req, res, next) => {
            if (req.body.email && req.body.password) {
                res.statusCode = 200;
                const fakeUser = {
                    id: 6,
                    name: "User Name",
                }
                res.send(JSON.stringify(fakeUser));
                return;
            }
            res.statusCode = 422;
            res.send("Invalid Login Credentials");
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