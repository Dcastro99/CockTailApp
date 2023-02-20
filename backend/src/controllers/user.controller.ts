
import * as express from 'express';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import bcrypt from "bcrypt";

class UserController {

    public router = express.Router();
    private userService: UserService;
    constructor() {
        this.initializeRoutes();

        this.userService = new UserService();
    }

    public initializeRoutes() {
        this.router.get("users", this.getAllUsers);
        this.router.post("/users/login", this.login);
        this.router.post("/users/register", this.registerUser);
    }

    getAllUsers = (req: express.Request, res: express.Response) => {
        this.userService.getUsers().then(data => {
            return res.json(data)
        });
    };

    registerUser = async (req: express.Request, res: express.Response) => {
        try {
            const newUser = await this.userService.registerUser(req.body.loginObject.password, req.body.loginObject.email, "New User Name");
            res.statusCode = 200;
            res.json(newUser);
            return;
        } catch (error) {
            console.error(" " + error);
            res.statusCode = 422
            res.send("User Not Created");
            return;
        }
    };

    login = async (req: express.Request, res: express.Response) => {
        const userByEmail: User = await this.userService.getUserByEmail(req.body.loginObject.email);

        const passwordMatch: boolean = await bcrypt.compare(req.body.loginObject.password, userByEmail.password);
        if (passwordMatch) {
            res.statusCode = 200;
            res.send(userByEmail);
            return;
        }

        res.statusCode = 422;
        res.send("Invalid Login Credentials");
    };
    // this.express.put('/api/task', (req, res) => {
    //     this.taskController.updateTask(req.body.task).then(data => res.json(data));
    // });

    // this.express.delete('/api/task/:id', (req, res) => {
    //     this.taskController.deleteTask(req.params.id).then(data => res.json(data));
    // });
}

export default UserController;
