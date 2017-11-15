
exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTableIfExists('oauth_tokens'),
    knex.schema.createTable('oauth_tokens', (table) => {
      table.uuid('id').primary();
      table.text('access_token').notNullable();
      table.integer('client_id').defaultTo(1);
      table.uuid('user_id').notNullable();
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTableIfExists('oauth_tokens'),
  ])
);
