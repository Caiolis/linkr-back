import { db } from "../database/database.js";

export async function getUser(email) {
    return await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
};

export async function getUsersBySearchBar(searchTerm) {
    return await db.query(`SELECT * FROM users WHERE name ILIKE $1;`, [`%${searchTerm}%`]);
};

export async function getUserById(id) {
    return await db.query(`SELECT * FROM users WHERE id = $1;`, [id]);
};