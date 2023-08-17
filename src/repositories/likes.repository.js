import { db } from "../database/database.js";

export async function likesSELECT(post_id) {
	return await db.query(`SELECT * FROM likes WHERE post_id = $1`,[post_id]);
};
export async function likesINSERT(post_id,user_id) {
	return await db.query(`INSERT INTO likes (post_id,user_id) VALUES ($1,$2)`,[post_id,user_id]);
};

export async function likesDELETEfrom(post_id,user_id) {
	return await db.query(`DELETE FROM likes WHERE post_id = $1 AND user_id = $2`,[post_id,user_id]);
};
export async function likesSELECTJoined(post_id) {
	return await db.query(`SELECT user.name as name,user.photo as photo,likes.* FROM likes 
	JOIN user ON user.id = likes.user_id WHERE post_id = $1`,[post_id])
};