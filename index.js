'use strict';

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const webpackCompiler = webpack(webpackConfig);

const app = express();

app.set('view engine', 'hbs');
app.engine('hbs', require('hogan-express'));

app.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: '/dist',

  stats: {
    colors: true
  }
}));
app.use(webpackHotMiddleware(webpackCompiler));


app.get('/*', (req, res) => {
  res.render('index');
});

app.listen('3000');