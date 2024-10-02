import { OrderRepository } from "../../app/interfaces/repositories/order.repositorie";
import { IIngredientService } from "../../app/interfaces/services/ingredient";
import {
  InputCreateOrder,
  InputOrder,
  IOrderService,
} from "../../app/interfaces/services/order";
import { IPaymentService } from "../../app/interfaces/services/payment";
import { IProductService } from "../../app/interfaces/services/product";
import { ITableService } from "../../app/interfaces/services/table";
import { Order } from "../entitie/order";
import { Product } from "../entitie/product";

export class OrderService implements IOrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly paymentService: IPaymentService,
    private readonly tableService: ITableService,
    private readonly productService: IProductService,
    private readonly ingredientService: IIngredientService
  ) {}
  async create(data: InputCreateOrder): Promise<Order> {
    const table = await this.tableService.findById(data.tableId);
    if (table.get("status") == "closed") throw new Error("table is not ok");
    const order = Order.create(table);
    table.setStatus("closed");
    await this.orderRepository.create(order);
    await this.tableService.update({
      id: table.get("id"),
      status: table.get("status"),
    });
    return order;
  }
  async adding(data: InputOrder): Promise<Order> {
    const { orderId, products: _products } = data;
    const order = await this.orderRepository.findById(orderId);
    if (order.get("status") == "closed") throw new Error("order is not ok");
    const products = await Promise.all(
      _products.map(async (product) => {
        const resolvedProduct = await this.productService.findById(
          product.productId
        );
        const resolvedIncrements = product.incrementIds
          ? await Promise.all(
              product.incrementIds.map((id) =>
                this.ingredientService.findById(id)
              )
            )
          : [];
        return {
          product: resolvedProduct,
          quantity: product.quantity,
          increment: resolvedIncrements,
        };
      })
    );
    products.forEach((p) => {
      order.addProduct({
        product: new Product({ ...p.product }),
        quantity: p.quantity,
        increment: p.increment,
      });
    });
    await this.orderRepository.update(order);
    return order;
  }
  async close(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (order.get("status") == "closed") throw new Error("order is not ok");
    order.close();
    const payment = await this.paymentService.create({
      amount: order.get("price"),
      method: "credit",
      orderId: order.get("id"),
    });
    order.setPayment(payment);
    await this.orderRepository.update(order);
    return order;
  }
}
