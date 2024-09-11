import type { Knex } from "knex";

import { ROLE, TABLE } from "../../enums";

const enumName = "role";

/**
 * Create taable "users"
 *
 * @param {Knex} knex
 * @returns {Promise}
 *
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.USER, (table) => {
    table
      .uuid("id", { primaryKey: true, useBinaryUuid: true })
      .defaultTo(knex.fn.uuid());
    table.string("name", 100).notNullable();
    table.string("email", 100).notNullable().unique();
    table.string("password", 100).notNullable();
    table
      .enu("role", Object.values(ROLE), {
        useNative: true,
        enumName: enumName,
      })
      .notNullable()
      .defaultTo(ROLE.USER);
  });
}

/**
 * Drop table "users"
 */
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE.USER);
  await knex.schema.raw(`DROP TYPE IF EXISTS ${enumName};`);
}
