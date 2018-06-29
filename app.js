const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./app/lib/database').connection;

const workController = require('./app/work/workController');

const host = '127.0.0.1';
const port = 8080;

// create express instance
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/work', workController.addWork);

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}/`)
})