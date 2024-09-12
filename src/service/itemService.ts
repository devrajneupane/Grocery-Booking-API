import { UUID } from "crypto";
import { ROLE } from "../enums";
import { NotFound } from "../error";
import { IGetUserQuery, IItem } from "../interface";
import { ItemModel } from "../model/itemModel";
import { UserService } from "./userService";

export class ItemService {
  /**
   * Get all items
   *
   * @param {IGetUserQuery} query Query parameters
   * @returns List of items
   */
  static async getItems(userId: UUID, query: IGetUserQuery) {
    let data = await ItemModel.getItems(query);
    const user = await UserService.getUserById(userId);

    // Show only available items to user
    if (user.role === ROLE.USER) {
      data = data.filter((item) => item.quantityInStock > 0);
    }

    return {
      message: `All items retrieved successfully`,
      items: data,
    };
  }

  /**
   * Create new item[s]
   *
   * @returns Newly created item object
   */
  static async createItems(items: IItem[]) {
    const data = await ItemModel.createItems(items);

    return {
      message: `Items created successfully`,
      createdItems: data,
    };
  }

  /**
   * Update item
   *
   * @param  itemData Updated Item data
   * @returns Item object
   */
  static async updateItem(itemId: number, itemData: Partial<IItem>) {
    // Prevent id from being updated
    const { id, ...updatedData } = itemData;

    await ItemModel.updateItem(itemId, updatedData);

    const updatedItemData = await this.getItemById(itemId);

    return {
      message: "Item updated successfully",
      updatedItem: updatedItemData.item,
    };
  }

  /**
   * Delete Item
   *
   * @param id Item ID
   * @returns Item object with message
   * @throws `UnauthorizedError` Error if user is not authorized to delete
   */
  static async deleteItem(id: number) {
    const item = await this.getItemById(id);

    await ItemModel.deleteItem(id);

    return {
      message: "Item deleted successfully",
      deletedItem: item.item,
    };
  }

  /**
   * Get item by id
   *
   * @param id Item id
   * @returns Item object
   * @throws `NotFound` Error if item does not exists
   */
  static async getItemById(id: number) {
    const item = await ItemModel.getItemById(id);

    if (!item) {
      throw new NotFound(`Item with id ${id} does not exists`);
    }

    return {
      message: "Item retrieved successfully",
      item,
    };
  }
}
