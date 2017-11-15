exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.table('oauth_tokens', (table) => {
      table.dropColumn('client_id');
    }),
    knex.schema.table('oauth_tokens', (table) => {
      table.text('client_id');
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.table('oauth_tokens', (table) => {
      table.dropColumn('client_id');
    }),
    knex.schema.table('oauth_tokens', (table) => {
      table.integer('client_id');
    }),
  ])
);
