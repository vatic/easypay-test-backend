const knex = require('../db/knex');

const tableName = 'phones';

const listPhones = () =>
  knex(tableName).select('*').limit(10);

module.exports = {
  listPhones,
  // addPhone,
  // removePhone,
  // checkPhone,
}
