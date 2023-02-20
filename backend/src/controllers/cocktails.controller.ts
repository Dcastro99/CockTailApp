
import * as express from 'express';
import { Cocktail } from '../models/cocktail.model';
import { User } from '../models/user.model';
import { CocktailsService } from '../services/cocktails.service';

class CocktailsController {

    public router = express.Router();
    private cocktailsService: CocktailsService;
    constructor() {
        this.initializeRoutes();

        this.cocktailsService = new CocktailsService();
    }

    public initializeRoutes() {
        this.router.get("/cocktails", this.getAllCocktails);
        this.router.get("/userCocktails", this.getUserCocktails);
        this.router.post("/userCocktails/create", this.createCocktail);
    }

    getAllCocktails = async (req: express.Request, res: express.Response) : Promise<Cocktail[]> => {
        const cocktails : Cocktail[] = await this.cocktailsService.getCocktails();
		res.statusCode = 200;
		res.json(cocktails);
		return cocktails;
    };

    createCocktail = async (req: express.Request, res: express.Response) : Promise<Cocktail> => {
        try {
            const newCocktail : Cocktail = await this.cocktailsService.createCocktail(req.body.userId, req.body.name);
            res.statusCode = 200;
            res.json(newCocktail);
            return newCocktail;
        } catch (error) {
            console.error(" errorr ;; " + error);
            res.statusCode = 422
            res.send("User Not Created");
            return Cocktail.build();
        }
    };

    getUserCocktails = async (req: express.Request, res: express.Response) : Promise<Cocktail[]> => {
        const cocktails: Cocktail[] = await this.cocktailsService.getCocktailsByUserId(req.body.userId);
		res.statusCode = 200;
		res.send(cocktails);
		return cocktails;

    };
    // this.express.put('/api/task', (req, res) => {
    //     this.taskController.updateTask(req.body.task).then(data => res.json(data));
    // });

    // this.express.delete('/api/task/:id', (req, res) => {
    //     this.taskController.deleteTask(req.params.id).then(data => res.json(data));
    // });
}

export default CocktailsController;
