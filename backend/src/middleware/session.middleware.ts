import * as express from 'express';
import { DecodeResult, decodeSession, Session } from '../services/tokens.service';

const isLoggedIn = (req: express.Request) => {
	const userId = req.headers["user-id"];
	const cookieParts = req.headers.cookie;
	const SECRET_KEY_HERE = "My Secret For Now";
	if (cookieParts) {
		const cookieToken = cookieParts.split("Cocktail-App-Token=")[1];
		const result : DecodeResult = decodeSession(SECRET_KEY_HERE, cookieToken);
		
		if (result && userId == result.session?.userId) {			
			return true;
		}
	}

	return false;
}
class Sessions {
	public static checkSession = (req: express.Request, res: express.Response, next: Function) => {
		if (isLoggedIn(req)) {
			next();
		} else {
			res.status(401).json({ message: "Unauthorized" });
		}
	}
}

export { Sessions };