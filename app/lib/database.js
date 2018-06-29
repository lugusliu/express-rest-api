const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '118.25.129.66',
  user: 'root',
  password: 'pwd123',
  database: 'cms_db',
  port: 3306
});

connection.connect();

module.exports = {
  connection: connection
};