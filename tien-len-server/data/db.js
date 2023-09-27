const mysql = require('mysql2');
require("dotenv").config();
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'tien-len-db'
});

connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Database Connected Successfully..!!');
    }
});

module.exports = connection;