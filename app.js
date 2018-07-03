const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const connection = require('./app/lib/database').connection;

// controller
const workController = require('./app/work/workController');
const companyController = require('./app/company/companyController');
const productController = require('./app/product/productController');

// host qcloud
const host = '127.0.0.1';
// port
const port = 8888;

// create express instance
const app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", 'express');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// applying middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get work
app.post('/api/getWork', workController.getWork);
// add new work
app.post('/api/addWork', workController.addWork);
// update work
app.post('/api/updateWork', workController.updateWork);

// get company
app.post('/api/getCompany', companyController.getCompany);
// update company
app.post('/api/updateCompany', companyController.updateCompany);

// get product
app.post('/api/getProduct', productController.getProduct);
// add new product
app.post('/api/addProduct', productController.addProduct);
// update product
app.post('/api/updateProduct', productController.updateProduct);

app.listen(port, () => {
  console.log(chalk.bgGreen(`Server running at http://${host}:${port}/`));
});