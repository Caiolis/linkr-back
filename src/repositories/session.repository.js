import { db } from "../database/database.js";

export async function insertSession(token, userId) {
    return await db.query(`INSERT INTO sessions (token, "user_id") VALUES ($1, $2);`, [token, userId]);
};