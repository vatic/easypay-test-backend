const express = require('express');
const R = require('ramda');
const { removeToken } = require('../services/auth');

const logoutRouter = express.Router();

logoutRouter
  .post('/', async (req, res) => {
    const { token } = req.body;
    const result = await removeToken(token);
    if (R.has('status')(result)) res.sendStatus(result.status);
    res.json(result);
  });

module.exports = {
  logoutRouter,
};
