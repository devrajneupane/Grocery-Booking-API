import type { Knex } from "knex";

import { TABLE } from "../../enums";

/**
 * Create taable "orders"
 *
 * @param {Knex} knex
 * @returns {Promise}
 *
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.ORDER, (table) => {
    table
      .uuid("id", { primaryKey: true, useBinaryUuid: true })
      .defaultTo(knex.fn.uuid());
    table.integer("item_id").references("id").inTable(TABLE.ITEM);
    table.integer("quantity").notNullable();
    table.uuid("ordered_by").references("id").inTable(TABLE.USER);
    table.timestamp("ordered_at").notNullable().defaultTo(knex.fn.now());
  });
}

/**
 * Drop table "orders"
 */
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE.ORDER);
}
