const R = require('ramda');
const {
  listPhones,
  insertPhone,
  findPhone,
  deletePhone,
} = require('../models/phone');

/**
 * Verify phone number.
 * @param  {string} phone - XXX-XXX-XXXXX or XXX.XXX.XXXX or XXX XXX XXXX
 */
const verifyPhone = phone =>
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
const notValid = phone => Promise.resolve({ msg: `Phone: ${phone} is not valid`, status: 422 });
const notFound = () => Promise.resolve({ error: 'Phone is not found' });
const found = findResult => Promise.resolve({ phones: findResult });
const checkFindResults = o => typeof o !== 'undefined';
const deleted = () => Promise.resolve({ msg: 'Phone is deleted' });
const notDeleted = () => Promise.resolve({ msg: 'Phone is not deleted', status: 422 });
const checkDeleteResults = n => parseInt(n, 10) > 0;

const addPhone = R.ifElse(verifyPhone, insertPhone, notValid);
const removePhone = R.pipeP(deletePhone, R.ifElse(checkDeleteResults, deleted, notDeleted));
const checkPhone = R.pipeP(findPhone, R.ifElse(checkFindResults, found, notFound));
const res500 = () => Promise.resolve({ msg: 'Wrong parameters', status: 500 });


module.exports = {
  listPhones,
  addPhone,
  removePhone,
  checkPhone,
  res500,
};
