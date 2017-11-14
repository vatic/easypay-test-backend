exports.up = (knex, Promise) => (
  Promise.all([
    knex.raw('CREATE EXTENSION pgcrypto'),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.raw('DROP EXTENSION pgcrypto'),
  ])
);
