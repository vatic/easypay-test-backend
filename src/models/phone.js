const knex = require('../db/knex');

const tableName = 'phones';

// const listPhones = offset =>
// knex(tableName).select('id', 'phone').limit(15).offset(offset).orderBy('id');
const listPhones = () => knex(tableName).select('id', 'phone').orderBy('id');

const insertPhone = phone => knex(tableName).insert({ phone });

const insertPhones = phones => knex(tableName).insert(phones);

const findPhone = phone => knex(tableName).whereRaw('phone LIKE ?', [`${phone}%`]).select('phone');


const deletePhone = phone => knex(tableName).where({ phone }).del();

const deleteAllPhones = () => knex.truncate(tableName);

const numberOfRows = () => knex(tableName).count();

module.exports = {
  listPhones,
  insertPhone,
  insertPhones,
  findPhone,
  deletePhone,
  deleteAllPhones,
  numberOfRows,
};
