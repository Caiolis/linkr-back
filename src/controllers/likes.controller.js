import { likesSELECT,likesINSERT,likesDELETEfrom,likesSELECTJoined } from "../repositories/likes.repository.js";
export async function likesGET(req, res) 
{
	const { token } = req.headers
	const { post_id} = req.body
	try
	{	
		const session = await db.query(`SELECT * FROM sessions WHERE token = $1`,[token])
		const user_id = session.rows[0].user_id
		const likes = await likesSELECT(post_id)
		const userLikes = await db.query(`SELECT * FROM users WHERE post_id = $1 AND user_id = $2`,[post_id,user_id])
		const yourLike = userLikes.rows.length == 0? "Você": null
		return res.status(200).send({likesCount:likes.rowsCount,you:yourLike})
	}catch(err){return res.status(500).send({message: err.message})}
}
export async function likesPOST(req, res) 
{
	const { token } = req.headers
	const { post_id} = req.body
	try
	{
		const session = await db.query(`SELECT * FROM sessions WHERE token = $1`,[token])
		const user_id = session.rows[0].user_id
		await likesINSERT(post_id, user_id)
		return res.sendStatus(201)
	}catch(err){return res.status(500).send({message: err.message})}
}
export async function likesDELETE(req, res) 
{
	const { token } = req.headers
	const { post_id} = req.body
	try
	{
		const session = await db.query(`SELECT * FROM sessions WHERE token = $1`,[token])
		const user_id = session.rows[0].user_id
		await likesDELETEfrom(post_id,user_id)
		return res.sendStatus(201)
	}catch(err){return res.status(500).send({message: err.message})}
}
export async function likesUSERSGET(req, res) 
{
	const { post_id} = req.body
	try
	{
		const likes = await likesSELECTJoined(post_id)
		return res.status(200).send(likes.rows)
	}catch(err){return res.status(500).send({message: err.message})}
}
