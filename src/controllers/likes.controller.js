import { likesSELECT,likesINSERT,likesDELETEfrom,likesSELECTJoined } from "../repositories/likes.repository.js";
import { selectSession } from "../repositories/session.repository.js";
import { db } from "../database/database.js";
export async function likesGET(req, res) 
{
	const { token } = req.headers
	const { post_id} = req.body
	try
	{	
		const session = await selectSession(token)
		const user_id = await  session.rows[0].user_id
		const likes = await likesSELECT(post_id)
		if(likes.rows.length === 0){
			return res.status(200).send({ likes:0 ,you:""});
		}
		const userLikes = await db.query(`SELECT * FROM likes WHERE post_id = $1 AND user_id = $2`,[post_id,user_id])
		const you = userLikes.rowsCount !== 0 ? true:false
		
		return res.status(200).send({likes:likes.rowCount,you:you,
		});
	}catch(error){
		console.log(error.message);
		return res.status(500).send({message: error.message})}
}
export async function likesPOST(req, res) 
{
	const { token } = req.headers
	const { post_id} = req.body
	try
	{
		const session = await selectSession(token)
		const user_id = session.rows[0].user_id
		await likesINSERT(post_id, user_id)
		return res.sendStatus(201)
	}catch(error){
		console.log(error.message);	
		res.status(500).send({message: error.message})
	}
}
export async function likesDELETE(req, res) 
{
	const { token } = req.headers
	const { post_id} = req.body
	try
	{
		const session = await selectSession(token)
		const user_id = session.rows[0].user_id
		await likesDELETEfrom(post_id,user_id)
		console.log(session.rows)
		return res.status(201).send({you:session})
	}catch(error){
		console.log(error.message);	
		res.status(500).send({message: error.message})
	}
}
export async function likesUSERSGET(req, res) 
{
	const { post_id} = req.body
	try
	{
		const likes = await likesSELECTJoined(post_id)
		return res.status(200).send(likes.rows)
	}catch(error){
		console.log(error.message);	
		res.status(500).send({message: error.message})
	}
}
