const express = require('express');
const phoneModel = require('../models/phone');

const router = express.Router();

router.get('/', async (req, res) => {
  const phones = (await phoneModel.listPhones());
  res.json(phones);
});

router.post('/', async (req, res) => {
  const response = (await phoneModel.addPhone(req.body.phone));
  res.json(response);
});

module.exports = router;
