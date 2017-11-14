const uuid = require('node-uuid');

const query = "INSERT INTO users (id, username, password) VALUES (?, 'admin', crypt('admin', gen_salt('bf')))";
exports.seed = knex =>
  knex('users').truncate()
    .then(() => knex.raw(query, [uuid.v1()]));
