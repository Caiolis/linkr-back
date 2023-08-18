import { db } from "../database/database.js";

export async function publishPostIntoDb(link, description, userId) {
  return await db.query(
    `INSERT INTO posts (link, description, user_id, created_at) VALUES ($1, $2, $3, NOW());`,
    [link, description, userId]
  );
}

export function getAllPostsFromDb() {
  return db.query(
    `SELECT posts.created_at, posts.link, posts.description, users.name, users.photo FROM posts JOIN users on posts.user_id = users.id ORDER BY posts.created_at DESC LIMIT 20;`
  );
}
export async function selectUserPost(user_id, post_id) {
  return await db.query(`SELECT * FROM posts WHERE user_id = $1 AND id = $2;`, [user_id, post_id]);
}

export async function deleteUserPost(post_id) {
  return await db.query(`DELETE FROM posts WHERE id = $1;`, [post_id]);
}

export async function updateUserPost(description, post_id) {
  return await db.query(`UPDATE posts SET description = $1 WHERE id = $2;`, [description, post_id]);
}

