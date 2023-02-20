import { connect } from "../config/db.config";
import { APILogger } from '../logger/api.logger';
import { Cocktail } from "../models/cocktail.model";

export class CocktailRepository {

    private logger: APILogger;
    private db: any = {};
    private cocktailRepository: any;

    constructor() {
        this.logger = new APILogger();
        this.db = connect();
        // For Development
        // this.db.sequelize.sync({ force: true }).then(() => {
        //     this.logger?.info("Drop and re-sync db.", {});
        // });
        this.cocktailRepository = this.db.sequelize.getRepository(Cocktail);
    }

    async getCocktails() {
        
        try {
            const cocktails = await this.cocktailRepository.findAll();
            this.logger.info('cocktails:::', cocktails);
            return cocktails;
        } catch (err) {
			this.logger.error('Error::' + err);
            return [];
        }
    }

    async getCocktailsByUserId(userId: number) : Promise<Cocktail[]> {
		console.log('userId ?? ', userId);
		
        try {
            const userCocktails : Cocktail[] = await this.cocktailRepository.findAll({where: {
                userId: userId
            }});
            this.logger.info('userCocktails by user id :::', userCocktails);
            return userCocktails;
        } catch (err) {
			this.logger.error('Error::' + err);
            return [];
        }
    }

    async createCocktail(userId : number, cocktailName: String) : Promise<Cocktail> {
        try {
			let data : Cocktail = await this.cocktailRepository.create({name: cocktailName, userId: userId});
			return data;
        } catch(err) {
            this.logger.error('Error::' + err);
        }
		return Cocktail.build();
    }

    // async updateUser(user :User) {
    //     let data = {};
    //     try {
            
    //         data = await this.userRepository.update({...user}, {
    //             where: {
    //                 id: user.id
    //             }
    //         });
    //     } catch(err) {
    //         this.logger?.error('Error::' + err);
    //     }
    //     return data;
    // }

    // async deleteUser(userId :Number) {
    //     let data = {};
    //     try {
    //         data = await this.userRepository.destroy({
    //             where: {
    //                 id: userId
    //             }
    //         });
    //     } catch(err) {
    //         this.logger?.error('Error::' + err);
    //     }
    //     return data;
    // }
}