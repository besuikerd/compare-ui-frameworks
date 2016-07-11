const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  const api = require('./controllers/api')(app);
  const frameworks = require('./controllers/frameworks');

  router.use('/api', api);
  router.use('/frameworks', frameworks);

  router.get('/', (req, res) => res.redirect('/frameworks'));
  return router;
};