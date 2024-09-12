import { TABLE } from "../enums";
import { BaseModel } from "./baseModel";
import { IItem, IGetUserQuery } from "../interface";

/**
 * itemModel class represents operations related to item management
 * Extends BaseModel for common functionalities
 */
export class ItemModel extends BaseModel {
  /**
   * Retrieves a list of items based on filter criteria
   *
   * @param filter Filter criteria including search query, page, and size
   * @returns List of item
   */
  static async getItems(filter: IGetUserQuery) {
    const { q } = filter;

    let items = this.queryBuilder()
      .select<IItem[]>("*")
      .table(TABLE.ITEM)
      .orderBy("last_updated")
      .limit(filter.size || 10)
      .offset((filter.page || 1 - 1) * (filter.size || 10));

    if (q) {
      items.whereLike("name", `%${q}%`);
    }

    return items;
  }

  /**
   * Creates a new items
   *
   * @param items Items to add
   */
  static async createItems(items: IItem[]): Promise<IItem[]> {
    return await this.queryBuilder().transaction(async (trx) => {
      return await trx(TABLE.ITEM).insert(items).returning<IItem[]>("*");
    });
  }

  /**
   * Updates an existing item
   *
   * @param itemData Updated Item data
   */
  static async updateItem(id: number, itemData: Partial<IItem>): Promise<void> {
    return await this.queryBuilder().transaction(async (trx) => {
      await trx(TABLE.ITEM).where({ id }).update(itemData);
    });
  }

  /**
   * Deletes a item by ID
   *
   * @param id item ID
   */
  static async deleteItem(id: number) {
    await this.queryBuilder().transaction(async (trx) => {
      await trx(TABLE.ITEM).where({ id }).del();
    });
  }

  /**
   * Retrieves item by id
   *
   * @param id item id
   * @returns item object if found or undefined
   */
  static async getItemById(id: number): Promise<IItem> {
    const item = await this.queryBuilder()
      .select<IItem>("*")
      .table(TABLE.ITEM)
      .where({ id })
      .first();
    return item!;
  }
}
