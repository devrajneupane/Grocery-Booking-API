import { Knex } from "knex";

import { TABLE } from "../../enums";

/**
 * Delete existing entries from given table and seed some values
 *
 **/
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE.ITEM).del();

  // Inserts seed entries
  await knex(TABLE.ITEM).insert([
    {
      name: "chocolate",
      description: "everyday chocolate",
      price: 20,
      quantityInStock: 100,
      lastUpdated: "2024-09-11T02:46:49.244Z",
    },
    {
      name: "biscuit",
      description: null,
      price: 190,
      quantityInStock: 0,
      lastUpdated: "2024-09-11T02:46:49.244Z",
    },
    {
      name: "eggs",
      description: null,
      price: 20,
      quantityInStock: 12,
      lastUpdated: "2024-09-11T02:46:49.244Z",
    },
  ]);
}
