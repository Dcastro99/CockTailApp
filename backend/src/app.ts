import * as bodyParser from "body-parser";
import express from "express";
import { APILogger } from "./logger/api.logger";
import UserController from "./controllers/user.controller";
import CocktailsController from "./controllers/cocktails.controller";
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import 'dotenv/config'
import cookieSession from "cookie-session";



class App {

    public express: express.Application;
    public logger: APILogger;
    // public userController: UserController;

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
        // this.userController = new UserController();
    }
    
    // Configure Express middleware.
    private middleware(): void {
        const sessionConfig = {
            name: "cocktailApp",
            secret: "Give me cookies or give me nothing",
            cookie: {
                maxAge: 1000 * 60 * 60,
                secure: false, // set to true on prod to use HTTPS
                httpOnly: true,
            },
            resave: false,
            saveUninitialized: true,
        };
        this.express.use(cookieSession(sessionConfig))
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.use("/api", new UserController().router);
        this.express.use("/api", new CocktailsController().router);
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