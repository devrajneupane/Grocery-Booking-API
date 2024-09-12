import { UUID } from "crypto";

import { IOrder } from "../interface";
import { OrderModel } from "../model/orderModel";
import { ItemService } from "./itemService";

const temp: { id: number; qunatity: number }[] = [];
export class OrderService {
  static async createOrders(userId: UUID, orders: IOrder[]) {
    orders.forEach(async (order) => {
      order.orderedBy = userId;

      const itemData = await ItemService.getItemById(order.itemId);
      const item = itemData.item;
      temp.push({
        id: item.id,
        qunatity: item.quantityInStock - order.quantity,
      });
      if (order.quantity > item.quantityInStock) {
        throw new Error(
          `Order quantity is more than available qunatity for item ${item.id}`,
        );
      }
    });

    const data = await OrderModel.createOrders(orders);
    temp.forEach(async (item) => {
      await ItemService.updateItem(item.id, { quantityInStock: item.qunatity });
    });

    return {
      message: `Items ordered successfully`,
      orderedItems: data,
    };
  }
}
