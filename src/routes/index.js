const express = require('express');

const router = express.Router();

// eslint-disable-next-line node/no-unsupported-features/es-syntax
router.get('/', async (req, res) => {
  res.render('pages/index');
});

module.exports = router;
