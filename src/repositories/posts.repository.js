import { db } from "../database/database.js";

export function publishPostIntoDb(link, description, userId) {
  return db.query(
    `INSERT INTO posts (link, description, user_id, created_at) VALUES ($1, $2, $3, NOW());`,
    [link, description, userId]
  );
}

export function getAllPostsFromDb() {
  return db.query(
    `SELECT posts.created_at, posts.link, posts.description, users.name, users.photo FROM posts JOIN users on posts.user_id = users.id ORDER BY posts.created_at DESC LIMIT 20;`
  );
}
