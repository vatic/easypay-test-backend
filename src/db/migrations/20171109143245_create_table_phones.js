exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTableIfExists('phones'),
    knex.schema.createTable('phones', (table) => {
      table.increments('id').primary();
      table.string('phone', 12);
      table.timestamps();
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTableIfExists('phones'),
  ])
);
