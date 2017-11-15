const query = "INSERT INTO users (username, password) VALUES ('admin', crypt('admin', gen_salt('bf')))";
exports.seed = knex =>
  knex('users').truncate()
    .then(() => knex.raw(query));
