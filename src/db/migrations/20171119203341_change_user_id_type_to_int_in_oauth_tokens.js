exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.table('oauth_tokens', (table) => {
      table.dropColumn('user_id');
    }),
    knex.schema.table('oauth_tokens', (table) => {
      table.integer('user_id');
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.table('oauth_tokens', (table) => {
      table.dropColumn('user_id');
    }),
    knex.schema.table('oauth_tokens', (table) => {
      table.uuid('user_id');
    }),
  ])
);

