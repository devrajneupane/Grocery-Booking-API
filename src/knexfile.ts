import { Knex } from "knex";
import camelize from "camelize";
import toSnakeCase from "to-snake-case";

import { env } from "./config";

export const baseKnexConfig: Knex.Config = {
  client: env.database.client,
  connection: {
    host: env.database.host,
    port: +env.database.port!,
    user: env.database.user,
    password: env.database.password,
    database: env.database.name,
  },
};

const knexConfig: Knex.Config = {
  ...baseKnexConfig,
  migrations: {
    directory: "./database/migrations/",
    tableName: "migrations",
    extension: "ts",
  },

  // loads data into table
  seeds: {
    directory: "./database/seeds/",
    extension: "ts",
  },

  wrapIdentifier: (value, origImpl) => {
    if (value === "*") {
      return origImpl(value);
    }
    return origImpl(toSnakeCase(value));
  },

  postProcessResponse: (result) => {
    return camelize(result);
  },
};

export default knexConfig;
