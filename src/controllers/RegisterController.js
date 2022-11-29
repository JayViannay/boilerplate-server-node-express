import express from 'express';
import UserModel from '../models/UserModel.js';

const router = express.Router();

router
    .post('/', async (req, res) => {
        const { email, password } = req.body;

        try {
            // Validate username
            // Validate password 
            // at least 8 characters 
            // contains at least one letter
            // contains at least one number
            
            const validEmail = true;
            const validPassword = true; 
            
            if (validEmail && validPassword) {
                // save user to db
                res.json(await UserModel.create({ email, password })).status(200);
            } else {
                // handle Errors
            }

        } catch (err) {
            // if something wrong happening, catch error
            res.json({ message: 'Error', error: err }).status(500);
        }
    });

export default router;
