import { db } from "../database/database.js"
// export  async function tokenvalidade(req,res,next){
// 	const {authorization} = req.headers
// 	try{
// 		const finder = await db.query(`SELECT * FROM "sessions" WHERE "token" = $1`,[authorization.replace('Bearer ',"").trim()])
// 		if(finder.rowCount === 0){
// 			return res.sendStatus(401)
// 		}
// 		console.log( "Olaaaaaaa",finder);
// 		req.finder = finder
		
// 	}
// 	catch(err){return res.status(500).send(err.message)}
// next()
// }

export async function tokenvalidade(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

    try {
        const session = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);
        if (!(session.rowCount)) return res.sendStatus(401);

        res.locals.session = session;       

    } catch (err) {
        res.status(500).send(err.message);
    }
	next();
}