const knex = require('../db/knex');

const tableName = 'phones';

/**
 * Verify phone number.
 * @param  {string} phone - XXX-XXX-XXXXX or XXX.XXX.XXXX or XXX XXX XXXX
 */
const verifyPhone = phone =>
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);


function listPhones() {
  console.log(knex(tableName).select('*').limit(10).toString());
  return knex(tableName).select('*').limit(10);
}

const addPhone = phone =>
  knex(tableName).insert(phone).limit(10);

module.exports = {
  listPhones,
  addPhone,
  // removePhone,
  // checkPhone,
  verifyPhone,
};
