
exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.createTable('users', (table) => {
      table.uuid('id').primary();
      table.text('username').notNullable();
      table.text('password').notNullable();
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTableIfExists('users'),
  ])
);
