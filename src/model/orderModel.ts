import { TABLE } from "../enums";
import { IOrder } from "../interface";
import { BaseModel } from "./baseModel";

export class OrderModel extends BaseModel {
  /**
   * Creates a new items
   *
   * @param items Items to add
   */
  static async createOrders(items: IOrder[]): Promise<IOrder[]> {
    console.warn("DEBUGPRINT[1]: orderModel.ts:11: items=", items)
    return await this.queryBuilder().transaction(async (trx) => {
      return await trx(TABLE.ORDER).insert(items).returning<IOrder[]>("*");
    });
  }
}
