const knex = require('../db/knex');

const tableName = 'phones';

const listPhones = offset => knex(tableName).select('*').limit(10).offset(offset);

const insertPhone = phone => knex(tableName).insert({ phone });

const findPhone = phone => knex(tableName).whereRaw('phone LIKE ?', [`${phone}%`]).select('phone');


const deletePhone = phone => knex(tableName).where({ phone }).del();

module.exports = {
  listPhones,
  insertPhone,
  findPhone,
  deletePhone,
};
