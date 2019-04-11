'use strict';

/**
 * API Server Module
 * @module src/app
 */
// 3rd Party Resources
const express = require('express');

const methodOverride = require('./middleware/method-override.js');
const errorHandler = require( './middleware/500.js');
const notFound = require( './middleware/404.js');

const DB = process.env.DB || 'pg';
const bookApp = require(`./routes/book-app-${DB}.js`);

// Prepare the express app
const app = express();

const server ={
  start:(port = process.env.PORT) => app.listen(port, () => console.log("Server up on", port))
};
module.exports = {app, server};


app.use(express.urlencoded({extended:true}));
app.use(methodOverride);
app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');
// app.set('views', `${__dirname}/views`);
app.set('views', './views');

app.use(bookApp);

app.get('*', notFound);
app.use(errorHandler);

