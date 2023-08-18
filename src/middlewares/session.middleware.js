import { searchSessionByToken } from "../repositories/session.repository.js";

// This middleware verify if the user has a token in the database
// If not then it means that the user is not authenticated and doesn't have authorization to proceed
// If the user has authorization it saves the token in the res.locals in case it has to be used again
export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("You are not allowed to do this");

  try {
    const session = await searchSessionByToken(token);
    if (session.rows.length === 0) return res.status(401).send("You are not allowed to do this");

    res.locals.token = token;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
