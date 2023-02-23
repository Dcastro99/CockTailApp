import { connect } from "../config/db.config";
import { APILogger } from '../logger/api.logger';
import { User, UserSettings, UserSocialLink, UserSocialList } from "../models/user.model";

export class UserRepository {

    private logger: APILogger;
    private db: any = {};
    private userRepository: any;

    constructor() {
        this.logger = new APILogger();
        this.db = connect();
        // For Development
        this.db.sequelize.sync({ force: true }).then(() => {
            this.logger?.info("Drop and re-sync db.", {});
        });
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

    async getUserByEmail(email: String) {
        
        try {
            const user = await this.userRepository.findOne({where: {
                email: email
            }});
            this.logger.info('user bt email:::', user);
            return user;
        } catch (err) {
			this.logger.error('Error::' + err);
            return [];
        }
    }


    async registerUser(password : String, email : String, userName: String) {
        const newUserSettings : UserSettings = new UserSettings();
        const userLink : UserSocialLink = new UserSocialLink();
        const userLinks : UserSocialList = new UserSocialList();
        userLinks.links.push(userLink);
        let data = {};
        try {
            data = await this.userRepository.create({name: userName, 
                                                    email, 
                                                    password, 
                                                    userSettings: JSON.parse(JSON.stringify(newUserSettings)), 
                                                    userSocialLinks: JSON.parse(JSON.stringify(userLinks))});
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