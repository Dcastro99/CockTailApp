import { Cocktail } from '../models/cocktail.model';
import { CocktailRepository } from '../repositories/cocktails.repository';

export class CocktailsService {

    private cocktailRepository: CocktailRepository;

    constructor() {
        this.cocktailRepository = new CocktailRepository();
    }

    async getCocktails() {
        return await this.cocktailRepository.getCocktails();
    }

    async getCocktailsByUserId(userId: number) : Promise<Cocktail[]> {
        return await this.cocktailRepository.getCocktailsByUserId(userId);
    }

    async createCocktail(userId : number, name : String)  : Promise<Cocktail>{
        return await this.cocktailRepository.createCocktail(userId, name);
    }

    // async updateUser(cocktail: Cocktail) {
    //     return await this.userRepository.updateUser(user);
    // }

    // async deleteUser(userId: Number) {
    //     return await this.userRepository.deleteUser(userId);
    // }

}