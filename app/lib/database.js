const mysql = require('mysql');
const chalk = require('chalk');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'my_db',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(chalk('mysql connected ...'));
});

module.exports = {
  connection: connection
};