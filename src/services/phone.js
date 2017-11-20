const R = require('ramda');
const {
  listPhones,
  insertPhone,
  insertPhones,
  findPhone,
  deletePhone,
  deleteAllPhones,
  numberOfRows,
} = require('../models/phone');

/**
 * Verify phone number.
 * @param  {string} phone - XXX-XXX-XXXXX
 */
const verifyPhone = phone => /^([0-9]{3})\-([0-9]{3})\-([0-9]{4})$/.test(phone);
const notValid = phone => Promise.resolve({ msg: `Phone: ${phone} is not valid`, status: 422 });
const notFound = () => Promise.resolve({ error: 'Phone is not found' });
const found = findResult => Promise.resolve({ phones: findResult });
const checkFindResults = o => typeof o !== 'undefined';
const deleted = () => Promise.resolve({ msg: 'Phone is deleted' });
const notDeleted = () => Promise.resolve({ msg: 'Phone is not deleted', status: 422 });
const checkDeleteResults = n => parseInt(n, 10) > 0;
const decorateNumberOfRows = ary => parseInt(ary[0].count, 10);

const addPhone = R.ifElse(verifyPhone, insertPhone, notValid);
const removePhone = R.pipeP(deletePhone, R.ifElse(checkDeleteResults, deleted, notDeleted));
const checkPhone = R.pipeP(findPhone, R.ifElse(checkFindResults, found, notFound));
const numOfRows = R.pipeP(numberOfRows, decorateNumberOfRows);
const res500 = () => Promise.resolve({ msg: 'Wrong parameters', status: 500 });

module.exports = {
  verifyPhone,
  notValid,
  notFound,
  found,
  checkFindResults,
  deleted,
  notDeleted,
  checkDeleteResults,
  insertPhones,

  listPhones,
  addPhone,
  removePhone,
  checkPhone,
  res500,
  deleteAllPhones,
  numOfRows,
};
