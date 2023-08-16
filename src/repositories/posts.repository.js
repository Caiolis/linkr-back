import { db } from "../database/database.js";

export function publishPostIntoDb(link, description, userId) {
  return db.query(
    `INSERT INTO posts (link, description, user_id, created_at) VALUES ($1, $2, $3, NOW());`,
    [link, description, userId]
  );
}

