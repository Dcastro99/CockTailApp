import { connect } from "../config/db.config";
import { APILogger } from '../logger/api.logger';
import { User } from "../models/user.model";

export class UserRepository {

    private logger: APILogger;
    private db: any = {};
    private userRepository: any;

    constructor() {
        this.logger = new APILogger();
        this.db = connect();
        // For Development
        // this.db.sequelize.sync({ force: true }).then(() => {
        //     this.logger?.info("Drop and re-sync db.", {});
        // });
        this.userRepository = this.db.sequelize.getRepository(User);
    }

    async getUsers() {
        
        try {
            const users = await this.userRepository.findAll();
            this.logger.info('users:::', users);
            return users;
        } catch (err) {
			this.logger.error('Error::' + err);
            return [];
        }
    }

    async registerUser(user :User) {
    
        let data = {};
        try {
            data = await this.userRepository.create(user);
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async updateUser(user :User) {
        let data = {};
        try {
            
            data = await this.userRepository.update({...user}, {
                where: {
                    id: user.id
                }
            });
        } catch(err) {
            this.logger?.error('Error::' + err);
        }
        return data;
    }

    async deleteUser(userId :Number) {
        let data = {};
        try {
            data = await this.userRepository.destroy({
                where: {
                    id: userId
                }
            });
        } catch(err) {
            this.logger?.error('Error::' + err);
        }
        return data;
    }
}