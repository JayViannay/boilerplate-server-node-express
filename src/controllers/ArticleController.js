import express from 'express';
import ArticleModel from '../models/ArticleModel.js';

const router = express.Router();

router
    .get('/', async (req, res) => {
        try {
            // call to findAll function from ArticleModel to get all users from db
            res.json(await ArticleModel.findAll()).status(200);
        } catch (err) {
            // if something wrong happening, catch error
            res.json({ message: 'Error', error: err }).status(500);
        }
    })

    .get('/:id', async (req, res) => {
        try {
            // call to find function from ArticleModel to get one user by id
            // catch id from params url named id : req.params.id
            // parse id value in Number type
            const result = await ArticleModel.find(Number(req.params.id));
            result ? (
                // if artcile id found then return it
                res.json(result).status(200)
                // else, handle error 404 not found
            ) : res.json({ message: 'Article not found' }).status(404);
        } catch (err) {
            // if something wrong happening, catch error
            res.json({ message: 'Error', error: err }).status(500);
        }
    })

    .post('/', async (req, res) => {
        // check required fields
        if (req.body.title) {
            try {
                const articleId = await ArticleModel.add(req.body.title);
                // then return successful message and userId created
                res.json({ success: 'User created successfully !', new_article_id: articleId }).status(201);
            }
            catch (err) {
                // if something wrong happening, catch error
                res.json({ errors: err }).status(500);
            }
            // if all fields are not submitted, handle error 
        } else res.json({ errors: 'All fields are required : title' }).status(409);
    })

    .put('/:id', async (req, res) => {
        // check fields required
        if (req.body.title && req.params.id) {
            console.log(req.params.id);
            try {
                /// check if user exist
                const article = await ArticleModel.find(Number(req.params.id));
                // if user doesn't exist, handle error 404 not found
                if (!article) res.json({ error: 'Article not found !' }).status(404);
                else {
                    const editArticle = {
                        title : req.body.title,
                        id : req.params.id
                    };
                    // call to edit function from ArticleModel to edit user's data
                    await ArticleModel.edit(editArticle);
                    // get user updated 
                    // call find function from ArticleModel 
                    const result = await ArticleModel.find(Number(req.params.id));
                    // return result and succesful edit message
                    res.json({ success: 'Article edited successfully !', result: result }).status(200);
                }
            }
            catch (err) {
                // if something wrong happening, catch error
                res.json({ errors: err }).status(500);
            }
            // handle error if some fields are not submitted
        } else res.json({ errors: 'All fields are required : title' }).status(409);
    })

    .delete('/:id', async (req, res) => {
        try {
            // check if user exist
            const user = await ArticleModel.find(Number(req.params.id));
            user ? (
                // if user exist remove it
                res.json(await ArticleModel.remove(Number(req.params.id))).status(200)
                // else, handle error 404 not found
            ) : res.json({ message: 'Article not found' }).status(404);
        } catch (err) {
            // if something wrong happening, catch error
            res.json({ message: 'Error', error: err }).status(500);
        }
    });

export default router;