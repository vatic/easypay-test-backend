const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.status(200).send({ msg: 'Phones' });
  res.end();
});

module.exports = router;
