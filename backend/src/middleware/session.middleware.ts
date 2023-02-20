import * as express from 'express';


// const headerHandler = (req: any) => {
// 	const { userId } = req.headers; // `userId` is now `string`
// 	if (userId != req.session?.user.id) {
// 		return false;
// 	}
// 	return true;
// }
class Sessions {
	public static checkSession = (req: express.Request, res: express.Response, next: Function) => {
		console.log('in check session');

		if (req.session?.userId) {
			next();
		} else {
			res.status(401).json({ message: "Unauthorized" });
		}
	}
}

export { Sessions };