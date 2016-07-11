'use strict';

const express = require('express');
const io = require('socket.io');
const http = require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');
const database = require('./lib/database');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override')

const port = 3000;

const webpackCompiler = webpack(webpackConfig);

const app = express();

const handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: require('./lib/handlebars-helpers')
});

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine);

// app.use(webpackDevMiddleware(webpackCompiler, {
//   publicPath: '/',
//
//   stats: {
//     colors: true
//   }
// }));
//
// app.use(webpackHotMiddleware(webpackCompiler));

app.use(logger('dev'));
app.use(cookieParser('dsa'));
app.use(session({
  secret: 'epic secret',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.flash = req.flash();
  console.log(res.locals.flash)
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));




database.load('db', true).then(db => {
  const server = http.Server(app)
  const socket = io(server);
  app.io = socket;

  app.use((req, res, next) => {
    req.db = db;
    req.io = socket;
    next();
  });


  const router = require('./router')(app);
  app.use('/', router);

  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });


  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });

  server.listen(port, () => console.log(`server listening on port ${port}`));
});