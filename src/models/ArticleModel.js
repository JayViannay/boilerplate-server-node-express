/** DATABASE CONNECTION */
import db from './_index.js';

const findAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM article', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};


const find = (id) => {
    console.log(id);
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM article WHERE id = ?', id, (err, result) => {
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
const add = (title) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO article (title) VALUES (?)',
            [title],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
    });
};

const edit = (article) => {
    const { title, id } = article;
    return new Promise((resolve, reject) => {
        db.query('UPDATE article SET title = ? WHERE id = ?;',
            [title, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
    });
};

const remove = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM article WHERE id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};


export default { findAll, find, add, edit, remove };