/**
 * CRUD FOR USER ENITY
 * @createUser
 * @readAllUsers
 * @readOneUser
 * @updateUser
 * @deleteUser
 * -- SPECIFIC METHOD FOR USER ENTITY
 * @findByEmail
 */

/** DATABASE CONNECTION */
import db from './_index.js';

/* -- CRUD FOR USER ENITY -- */
/**
 * @readAllUsers
 * @description get all users from database
 * @returns [array] users
 */
const findAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

/**
 * @readOneUser
 * @description find one user by id
 * @param {Number} id 
 * @returns [object] user
 */
const find = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

/**
 * @createUser
 * @description create a new user
 * @param {Object} user 
 * @returns lastInsertId
 */
const add = (user) => {
    const { email, password } = user;
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO user (email, password) VALUES (?, ?)',
            [email, password],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
    });
};

/**
 * @updateUser
 * @description Edit an user
 * @param {Object} user 
 * @param {Number} id 
 * @returns result
 */
const edit = (user) => {
    const { email, password, id } = user;
    return new Promise((resolve, reject) => {
        db.query('UPDATE user SET email = ?, password = ? WHERE id = ?;',
            [email, password, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    });
};

/**
 * @deleteUser
 * @description delete one user 
 * @param {Number} id 
 * @returns result
 */
const remove = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM user WHERE id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

/* -- SPECIFIC METHOD FOR USER ENTITY -- */
/**
 * @description find one user by email
 * @param {String} email 
 * @returns [object] user
 */
const findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE email = ?', email, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

export default { findAll, find, add, edit, remove, findByEmail };