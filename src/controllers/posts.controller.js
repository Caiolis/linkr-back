import { db } from "../database/database.js";
import { deleteUserPost, publishPostIntoDb, selectUserPost, updateUserPost } from "../repositories/posts.repository.js";
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
}

export async function deletePost(req, res) {
  const id = req.params.id;

  try {
    const user_id = await searchSessionByToken(res.locals.token);

    const userPost = await selectUserPost(user_id.rows[0].user_id, id);
    if(!(userPost.rowCount)) return res.status(401).send({message: 'Post não pertence ao usuário!'});

    await deleteUserPost(id);

    return res.status(200).send('Post deleted');
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export async function updatePost(req, res) {
  const {id} = req.params;
  const {description} = req.body; 

  try {
    const user_id = await searchSessionByToken(res.locals.token);

    const userPost = await selectUserPost(user_id.rows[0].user_id, id);
    if(!(userPost.rowCount)) return res.status(401).send({message: 'Post não pertence ao usuário!'});

    await updateUserPost(description, id)

    return res.status(200).send({message: 'Post updated'});
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}