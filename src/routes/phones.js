const express = require('express');
const phoneModel = require('../models/phone');

const router = express.Router();

router
  .get('/', async (req, res) => {
    const phones = (await phoneModel.listPhones());
    res.json(phones);
  })
  .post('/', async (req, res) => {
    const response = (await phoneModel.addPhone(req.body.phone));
    res.json(response);
  });

router
  .get('/:phone', async (req, res) => {
    const response = (await phoneModel.checkPhone(req.params.phone));
    res.json(response);
  })
  .delete('/:phone', async (req, res) => {
    const response = (await phoneModel.removePhone(req.params.phone));
    // const response = (await phoneModel.deletePhone(req.params.phone));
    res.json(response);
  });

module.exports = router;
