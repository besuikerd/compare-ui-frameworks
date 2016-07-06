'use strict';

const express = require('express');
const database = require('./lib/database');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');



const webpackCompiler = webpack(webpackConfig);

const app = express();

app.set('view engine', 'hbs');
app.engine('hbs', require('hogan-express'));

app.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: '/',

  stats: {
    colors: true
  }
}));
app.use(webpackHotMiddleware(webpackCompiler));


app.get('/*', (req, res) => {
  console.log(req.app.locals.db);

  res.render('index');
});



database.load('db', true, function(err, db){
  if(err) throw err.message;
  app.locals.db = db;
  app.listen('3000');
})


