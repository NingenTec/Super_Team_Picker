// Update with your config settings.

const sharedConfig = {
  client: "pg",
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "db/migrations",
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      database: "super_team_picker_dev",
    },

    seeds: {
      directory: "db/seeds",
    },
  },

  production: {
    ...sharedConfig,
    connection: {
      database: "super_team_picker_prod",
    },
  },
};
