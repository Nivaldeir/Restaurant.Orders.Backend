import { Order } from "../../../domain/entitie/order";

export interface OrderRepository {
  findAll(): Promise<any[]>;
  findById(orderId: string): Promise<Order>;
  create(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
}
