import { publishPostIntoDb, getAllPostsFromDb } from "../repositories/posts.repository.js";
import { searchSessionByToken } from "../repositories/session.repository.js";

export async function publishPost(req, res) {
  const { link, description } = req.body;

  try {
    const user_id = await searchSessionByToken(res.locals.token)
    const query = await publishPostIntoDb(link, description, user_id.rows[0].user_id);

    return res.status(201).send('Post published');
  } catch (error) {
    res.status(500).send({ message: error.message });
  };
};

export async function getAllPosts(req, res) {
  try {
    const query = await getAllPostsFromDb();

    res.status(200).send(query.rows)
  } catch (error) {
    res.status(500).send({ message: error.message });
  };
};