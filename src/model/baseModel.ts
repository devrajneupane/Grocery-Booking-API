import knex, { Knex } from "knex";

import knexConfig from "../knexfile";

export class BaseModel {
  static connection: Knex = knex(knexConfig);

  static queryBuilder() {
    return this.connection;
  }
}
