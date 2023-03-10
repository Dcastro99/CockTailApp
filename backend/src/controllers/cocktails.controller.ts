
import * as express from 'express';
import { Cocktail } from '../models/cocktail.model';
import { User } from '../models/user.model';
import { CocktailsService } from '../services/cocktails.service';
import { Sessions } from '../middleware/session.middleware';

class CocktailsController {

    public router = express.Router();
    private cocktailsService: CocktailsService;
    constructor() {
        this.initializeRoutes();

        this.cocktailsService = new CocktailsService();
    }

    public initializeRoutes() {
        this.router.get("/cocktails", Sessions.checkSession, this.getAllCocktails);
        this.router.get("/userCocktails", Sessions.checkSession, this.getUserCocktails);
        this.router.post("/userCocktails/create", Sessions.checkSession, this.createCocktail);
    }

    getAllCocktails = async (req: express.Request, res: express.Response) : Promise<Cocktail[]> => {
        const cocktails : Cocktail[] = await this.cocktailsService.getCocktails();
		res.statusCode = 200;
		res.json(cocktails);
		return cocktails;
    };

    createCocktail = async (req: express.Request, res: express.Response) : Promise<Cocktail | null> => {
        try {
            const newCocktail : Cocktail | null = await this.cocktailsService.createCocktail(req.body.userId, req.body.name);
            res.statusCode = 200;
            res.json(newCocktail);
            return newCocktail;
        } catch (error) {
            console.error(" errorr ;; " + error);
            res.statusCode = 422
            res.send("Cocktail Not Created");
            return null;
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
