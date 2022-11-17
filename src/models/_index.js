/**
 * Connection Database
 */

import mysql from 'mysql2';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) console.log(chalk.red(`❌ MySql connection:\n 🚦 ${err}`));
    else console.log(chalk.green(`✅ MySql connected\n ➡️ Database: ${chalk.bold(process.env.DB_NAME)}`));
});

export default db;