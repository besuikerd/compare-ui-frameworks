const express = require('express');
const router = express.Router();

const api = require('./controllers/api');
const frameworks = require('./controllers/frameworks');

router.use('/api', api);
router.use('/frameworks', frameworks);

router.get('/', (req, res) => res.redirect('/frameworks'));

module.exports = router;