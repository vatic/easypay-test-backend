module.exports = {

  development: {
    client: 'pg',
    connection: {
      user: 'vatagin',
      password: 'vat123',
      database: 'phonebook_dev',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds/dev',
    },
  },

  test: {
    client: 'pg',
    connection: {
      user: 'vatagin',
      password: 'vat123',
      database: 'phonebook_test',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: 'pgsql.instatfootball.tv',
      user: process.env.PHONEBOOK_USER,
      password: process.env.PHONEBOOK_PWD,
      database: 'phonebook',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

};
