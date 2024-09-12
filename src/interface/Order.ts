import { UUID } from "crypto";

export interface IOrder {
  id: UUID;
  itemId: number;
  quantity: number;
  orderedBy: UUID;
  orderedAt: Date;
}
