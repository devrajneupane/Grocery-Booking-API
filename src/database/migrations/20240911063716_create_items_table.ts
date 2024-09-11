import type { Knex } from "knex";

import { TABLE } from "../../enums";

/**
 * Create taable "items"
 *
 * @param {Knex} knex
 * @returns {Promise}
 *
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.ITEM, (table) => {
    table.bigIncrements("id").unsigned().notNullable().primary();
    table.string("name", 100).notNullable();
    table.text("description");
    table.double("price").notNullable();
    table.integer("quantity_in_stock", 100).notNullable();
    table.timestamp("last_updated").notNullable().defaultTo(knex.fn.now());
  });
}

/**
 * Drop table "items"
 *
 */
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE.ITEM);
}
