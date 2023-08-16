import { db } from "../database/database.js";

export async function insertSession(token, userId) {
    return await db.query(`INSERT INTO sessions (token, "user_id") VALUES ($1, $2);`, [token, userId]);
};

export function searchSessionByToken(token) {
    return db.query(`SELECT * FROM sessions WHERE token=$1`, [token]);
}