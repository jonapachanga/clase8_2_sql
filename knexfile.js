const path = require('path');
require('dotenv').config();
const env = process.env;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, env.SQLITE_FILENAME)
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  },

  staging: {
    client: env.DB_CONNECTION,
    connection: {
      host : env.DB_HOST,
      port : env.DB_PORT,
      user : env.DB_USERNAME,
      password : env.DB_PASSWORD,
      database : env.DB_DATABASE
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
