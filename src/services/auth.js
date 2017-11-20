const util = require('util');
const R = require('ramda');
const {
  getAccessToken,
  saveAccessToken,
  deleteAllTokens,
  deleteToken,
} = require('../models/oauth');

const saveToken = util.promisify(saveAccessToken);

const deleted = num => Promise.resolve({ msg: `${num} Token is deleted` });
const notDeleted = () => Promise.resolve({ msg: 'Token is not deleted', status: 422 });
const checkDeleteResults = n => parseInt(n, 10) > 0;


const getToken = token => util.promisify(getAccessToken)(token);

const removeToken = R.pipeP(deleteToken, R.ifElse(checkDeleteResults, deleted, notDeleted));

module.exports = {
  saveToken,
  getToken,
  deleteAllTokens,
  removeToken,
};
