/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rooting from './routes/index.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV === 'production' ? chalk.bold.bgBlue('*** PRODUCTION ENV ***') : chalk.bold.bgBlue('💻 DEV ENV ');

app.use(express.json()); 
app.use(cors(process.env.CORS_OPTIONS)); 
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

rooting(app);
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) =>{
    res.status(404);
    res.send('404: Not Found');
});

app.listen(port, () => {
    console.log(env);
    console.log(chalk.green(`✅ Server listenning on port ${port}`));
});