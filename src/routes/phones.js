const R = require('ramda');
const express = require('express');
const phoneService = require('../services/phone');

const restrictedPhoneRouter = express.Router();
const checkPhoneRouter = express.Router();

const checkParam = p => typeof p === 'string';

const templateCallback = (method, param) => async (req, res) => {
  const [key1, key2] = param ? param.split('.') : [null, null];
  const paramOrNull = param ? req[key1][key2] : null;
  const result = (await R.ifElse(
    checkParam,
    phoneService[method],
    R.curryN(0, phoneService[method]),
  )(paramOrNull));
  if (R.has('status')(result)) res.sendStatus(result.status);
  res.json(result);
};

restrictedPhoneRouter
  .get('/', templateCallback('listPhones'))
  .post('/', templateCallback('addPhone', 'body.phone'))
  .delete('/:phone', templateCallback('removePhone', 'params.phone'));

checkPhoneRouter
  .get('/:phone', templateCallback('checkPhone', 'params.phone'));


module.exports = {
  restrictedPhoneRouter,
  checkPhoneRouter,
};
