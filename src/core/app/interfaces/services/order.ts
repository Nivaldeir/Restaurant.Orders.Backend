import { Ingredient } from "../../../domain/entitie/ingredient";
import { Order } from "../../../domain/entitie/order";
import { Product } from "../../../domain/entitie/product";

export interface IOrderService {
  create(data: InputCreateOrder): Promise<Order>;
  adding(data: InputOrder): Promise<Order>;
  close(orderId: string): Promise<Order>;
}

export type InputCreateOrder = {
  tableId: string;
};

export type InputOrder = {
  orderId: string;
  products: {
    incrementIds?: string[];
    productId: string;
    quantity: number;
  }[];
};
