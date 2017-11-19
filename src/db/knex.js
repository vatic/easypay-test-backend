const environment = process.env.NODE_ENV || 'development';
console.log(environment);
const config = require('../../knexfile.js')[environment];

module.exports = require('knex')(config);
