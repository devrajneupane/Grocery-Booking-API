import { Knex } from "knex";

import { ROLE, TABLE } from "../../enums";

/**
 * Delete existing entries from given table and seed some values
 *
 **/
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE.USER).del();

  // Inserts seed entries
  await knex(TABLE.USER).insert([
    {
      id: "7d9cfefa-2dc2-4ca7-b968-87862c34225c",
      name: "user",
      email: "user@email.com",
      password: "$2b$10$GcnMXJYIflitD26EUL54k.X2k0qwIkfKTSLybFbAvC3gOZh1MGM0O",
      role: ROLE.ADMIN,
    },
    {
      id: "17a4b780-2d1b-4a53-bf82-62a4ecdb311f",
      name: "bob",
      email: "bob@email.com",
      password: "$2b$10$9DRk4GgQ8dNMZ/Kw0r.DV.T9aeIHQ6nXhQ/4UEkfy2gsMWzU9phvm",
    },
  ]);
}
