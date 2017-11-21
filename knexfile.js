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
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds/dev',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    // connection: {
    //   host: 'pgsql.instatfootball.tv',
    //   user: process.env.PHONEBOOK_USER,
    //   password: process.env.PHONEBOOK_PWD,
    //   database: 'postgresql-silhouetted-35919',
    // },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds/dev',
    },
  },

};
