const express = require('express');
const phoneService = require('../services/phone');

const router = express.Router();

const templateCallback = (method, param) => async (req, res) => {
  let response;
  const checkParam = p => typeof p === 'string';
  if (checkParam(param)) {
    const [key1, key2] = param.split('.');
    response = (await phoneService[method](req[key1][key2]));
  } else {
    response = (await phoneService[method]());
  }
  res.json(response);
};

router
  .get('/', templateCallback('listPhones'))
  .post('/', templateCallback('addPhone', 'body.phone'));

router
  .get('/:phone', templateCallback('checkPhone', 'params.phone'))
  .delete('/:phone', templateCallback('removePhone', 'params.phone'));

module.exports = router;
