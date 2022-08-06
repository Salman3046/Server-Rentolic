// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
      host : 'localhost',
      user : 'root',
      password : '',
      database : 'rentolic'
    },
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
