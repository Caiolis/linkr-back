import { db } from "../database/database.js"
export  async function tokenvalidade(req,res,next){
	const {authorization} = req.headers
	const select = `SELECT * FROM "tokens" WHERE "token" = $1`
	try{
		const finder = await db.query(select,[authorization.replace('Bearer',"").trim()])
		if(finder.rowCount === 0){
		return res.sendtatus(401)}
		req.finder = finder
	}
	catch(err){return res.status(500).send(err.message)}
next()
}