export interface IItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  quantityInStock: number;
  lastUpdated: Date;
  isAvailable?: boolean;
}
