/**
 * All entries for User entity
 * @createUser
 * @readAllUsers
 * @readOneUser
 * @updateUser
 * @deleteUser
 */

import express from 'express';
import UserModel from '../models/UserModel.js';

const router = express.Router();

router
    /**
     * @readAllUsers
     * @description get all users
     * @url '/api/users/'
     * @methode GET
     * @returns {JSON} 200|500
     */
    .get('/', async (req, res) => {
        try {
            // call to findAll function from UserModel to get all users from db
            res.json(await UserModel.findAll()).status(200);
        } catch (err) {
            // if something wrong happening, catch error
            res.json({ message: 'Error', error: err }).status(500);
        }
    })

    /**
     * @readOneUser
     * @description get one user
     * @url '/api/users/:id'
     * @param {*} id
     * @methode GET
     * @returns {JSON} 200|404|500
     */
    .get('/:id', async (req, res) => {
        try {
            // call to find function from UserModel to get one user by id
            // catch id from params url named id : req.params.id
            // parse id value in Number type
            const result = await UserModel.find(Number(req.params.id));
            result ? (
                // if user id found then return it
                res.json(result).status(200)
                // else, handle error 404 not found
            ) : res.json({ message: 'User not found' }).status(404);
        } catch (err) {
            // if something wrong happening, catch error
            res.json({ message: 'Error', error: err }).status(500);
        }
    })

    /**
     * @createUser
     * @description create new user
     * @url '/api/users/'
     * @methode POST
     * @returns {JSON} 201|409|500
     */
    .post('/', async (req, res) => {
        // check required fields
        if (req.body.email && req.body.password) {
            // keep value from the request body in constante
            const newUser = req.body;
            try {
                // check if email already exist
                const user = await UserModel.findByEmail(newUser.email);
                // if email already exist, handle error
                if (user) res.json({ errors: 'User already exist !' }).status(409);
                else {
                    // else, call to add function from UserModel to create new user
                    const userId = await UserModel.add(newUser);
                    // then return successful message and userId created
                    res.json({ success: 'User created successfully !', new_user_id: userId }).status(201);
                }
            } catch (err) {
                // if something wrong happening, catch error
                res.json({ errors: err }).status(500);
            }
            // if all fields are not submitted, handle error 
        } else res.json({ errors: 'All fields are required : email & password' }).status(409);
    })

    /**
     * @updateUser
     * @description edit one user
     * @url '/api/users/:id'
     * @param {*} id
     * @methode PUT
     * @returns {JSON} 200|409|500
     */
    .put('/', async (req, res) => {
        // check fields required
        if (req.body.email && req.body.password && req.body.id) {
            try {
                /// check if user exist
                const user = await UserModel.find(Number(req.body.id));
                // if user doesn't exist, handle error 404 not found
                if (!user) res.json({ error: 'User not found !' }).status(404);
                else {
                    // else, check if new email user is not already taken
                    const emailFound = await UserModel.findByEmail(String(req.body.email));
                    // if email is already taken, handle error 
                    if (user.email !== String(req.body.email) && emailFound) res.json({ error: 'Email already taken !' }).status(409);
                    else {
                        // else, edit user
                        const editUser = req.body;
                        // call to edit function from UserModel to edit user's data
                        await UserModel.edit(editUser);
                        // get user updated 
                        // call find function from UserModel 
                        const result = await UserModel.find(Number(req.body.id));
                        // return result and succesful edit message
                        res.json({ success: 'User edited successfully !', result: result }).status(200);
                    }
                }
            } catch (err) {
                // if something wrong happening, catch error
                res.json({ errors: err }).status(500);
            }
            // handle error if some fields are not submitted
        } else res.json({ errors: 'All fields are required : email & password' }).status(409);
    })

    /**
     * @deleteUser
     * @description delete one user
     * @url '/api/users/:id'
     * @param {*} id
     * @methode DELETE
     * @returns {JSON} 200|404|500
     */
    .delete('/:id', async (req, res) => {
        try {
            // check if user exist
            const user = await UserModel.find(Number(req.params.id));
            user ? (
                // if user exist remove it
                res.json(await UserModel.remove(Number(req.params.id))).status(200)
                // else, handle error 404 not found
            ) : res.json({ message: 'User not found' }).status(404);
        } catch (err) {
            // if something wrong happening, catch error
            res.json({ message: 'Error', error: err }).status(500);
        }
    });

export default router;