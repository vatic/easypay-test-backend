const knex = require('../db/knex');

const tableName = 'phones';

/*
  @param - phone - string, XXX-XXX-XXXXX or XXX.XXX.XXXX or XXX XXX XXXX
*/
const verifyPhone = (phone) => {
  const phoneMatcher = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (phone.match(phoneMatcher)) {
    return true;
  }
  return false;
};

const listPhones = () =>
  knex(tableName).select('*').limit(10);

const addPhone = phone =>
  knex(tableName).insert(phone).limit(10);

module.exports = {
  listPhones,
  addPhone,
  // removePhone,
  // checkPhone,
  verifyPhone,
};
