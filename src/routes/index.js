import UserController from '../controllers/UserController.js';
import ArticleController from '../controllers/ArticleController.js';

/**
 * Déclaration de toutes les entrées disponibles du serveur (url)
 */
export default (app) => {
    app.use('/api/users', UserController);
    app.use('/api/articles', ArticleController);
};