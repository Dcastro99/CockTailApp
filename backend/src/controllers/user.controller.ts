import { APILogger } from '../logger/api.logger';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

export class UserController {

    private userService: UserService;
    private logger: APILogger;

    constructor() {
        this.userService = new UserService();
        this.logger = new APILogger()
    }

    async getUsers() {
        this.logger.info('Controller: getUsers', {});
        return await this.userService.getUsers();
    }

    async getUserByEmail(email : String) {
        this.logger.info('Controller: getUser by email', email);
        return await this.userService.getUserByEmail(email);
    }

    async registerUser(password : String, email : String, name: String) {
        return await this.userService.registerUser(password, email, name);
    }

    async updateUser(user:User) {
        this.logger.info('Controller: updateUser', user);
        return await this.userService.updateUser(user);
    }

    async deleteUser(userId:Number) {
        this.logger.info('Controller: deleteUser', userId);
        return await this.userService.deleteUser(userId);
    }
}