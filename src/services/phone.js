const R = require('ramda');
const knex = require('../db/knex');

const tableName = 'phones';

/**
 * Verify phone number.
 * @param  {string} phone - XXX-XXX-XXXXX or XXX.XXX.XXXX or XXX XXX XXXX
 */
const verifyPhone = phone =>
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);

const listPhones = () => knex(tableName).select('*').limit(10);

const insertPhone = phone =>
  knex(tableName).insert({ phone }).limit(10);

const notValid = phone => Promise.resolve({ msg: `Phone: ${phone} is not valid`, status: 422 });

const addPhone = R.ifElse(verifyPhone, insertPhone, notValid);

const notFound = () =>
  Promise.resolve({ error: 'Phone is not found' });

const found = findResult =>
  Promise.resolve({ success: `Phone: ${findResult.phone} is found` });

const checkFindResults = o => typeof o !== 'undefined';

const findPhone = phone => knex(tableName).where({ phone }).first('phone');

const checkPhone = R.pipeP(findPhone, R.ifElse(checkFindResults, found, notFound));

const deletePhone = phone => knex(tableName).where({ phone }).del();

const deleted = () => Promise.resolve({ msg: 'Phone is deleted' });
const notDeleted = () => Promise.resolve({ msg: 'Phone is not deleted', status: 422 });

const checkDeleteResults = n => parseInt(n, 10) > 0;

const removePhone = R.pipeP(deletePhone, R.ifElse(checkDeleteResults, deleted, notDeleted));

module.exports = {
  listPhones,
  addPhone,
  removePhone,
  checkPhone,
};
