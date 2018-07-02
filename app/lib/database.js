const mysql = require('mysql');
const chalk = require('chalk');

const connection = mysql.createConnection({
  host: '118.25.129.66',
  user: 'root',
  password: 'pwd123',
  database: 'cms_db',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(chalk.cyan('mysql connected ...'));
});

module.exports = {
  connection: connection
};