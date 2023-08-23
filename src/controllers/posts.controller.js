import { deleteUserPost, publishPostIntoDb, selectUserPost, updateUserPost, getAllPostsFromDb } from "../repositories/posts.repository.js";
import { searchSessionByToken } from "../repositories/session.repository.js";
import urlMetadata from "url-metadata";

export async function publishPost(req, res) {
  const { link, description } = req.body;

  try {
    const user_id = await searchSessionByToken(res.locals.token)
    const query = await publishPostIntoDb(link, description, user_id.rows[0].user_id);

    return res.status(201).send('Post published');
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  };
};

export async function getAllPosts(req, res) {
  try {
    const user_id = await searchSessionByToken(res.locals.token);
    const query = await getAllPostsFromDb();
    const response = [];
    const newQuery = query.rows.map(post => ({...post, requested_by: user_id.rows[0].user_id}))
  
    for( let i = 0; i < query.rows.length; i++ ) {
      const metadados = await urlMetadata(query.rows[i].link);;

      const metadataUrl = {
        title: metadados.title === '' ? metadados["og:title"] : metadados.title,
        url: metadados.url,
        image: metadados.image === '' ? metadados["og:image"] : metadados.image,
        description: metadados.description === '' ? metadados["og:description"] : metadados.description,
      };
      const post = { ...newQuery[i], metadataUrl };
      response.push(post);
    }
    res.status(200).send(response)
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  };
};

export async function deletePost(req, res) {
  const id = req.params.id;

  try {
    const user_id = await searchSessionByToken(res.locals.token);

    const userPost = await selectUserPost(user_id.rows[0].user_id, id);
    if(!(userPost.rowCount)) return res.status(401).send({message: 'Post não pertence ao usuário!'});

    await deleteUserPost(id);

    return res.status(200).send('Post deleted');
  } catch (error) {
    console.log(error.message);
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
    console.log(error.message);
    res.status(500).send({ message: error.message })
  }
}
