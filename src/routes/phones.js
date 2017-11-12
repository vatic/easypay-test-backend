const express = require('express');
const phoneModel = require('../models/phone');

const router = express.Router();

router.get('/', async (req, res) => {
  // res.set('Content-Type', 'application/json');
  // res.status(200).send({ msg: 'Phones' });
  // res.end();
  const phones = (await phoneModel.listPhones());
  console.log(phones);
  res.json(phones);
});

module.exports = router;
