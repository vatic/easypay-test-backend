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

const notValid = phone => Promise.resolve({ error: `Phone: ${phone} is not valid` });

const addPhone = R.ifElse(verifyPhone, insertPhone, notValid);

module.exports = {
  listPhones,
  addPhone,
  // removePhone,
  // checkPhone,
  verifyPhone,
};
