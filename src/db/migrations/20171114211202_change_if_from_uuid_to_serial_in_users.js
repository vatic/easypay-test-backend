exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.table('users', (table) => {
      table.dropColumn('id');
    }),
    knex.schema.table('users', (table) => {
      table.increments();
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.table('users', (table) => {
      table.dropColumn('id');
    }),
    knex.schema.table('users', (table) => {
      table.uuid('id').primary();
    }),
  ])
);
