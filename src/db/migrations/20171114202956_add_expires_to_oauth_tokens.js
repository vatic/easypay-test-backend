exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.table('oauth_tokens', (table) => {
      table.timestamp('expires', true).notNullable();
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.table('oauth_tokens', (table) => {
      table.dropColumn('expires');
    }),
  ])
);
