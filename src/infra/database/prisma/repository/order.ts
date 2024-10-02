import { PrismaClient } from "@prisma/client";
import { OrderRepository } from "../../../../core/app/interfaces/repositories/order.repositorie";
import { Order } from "../../../../core/domain/entitie/order";
import { Payment } from "../../../../core/domain/entitie/payment";
import { Table } from "../../../../core/domain/entitie/table";
import { Product } from "../../../../core/domain/entitie/product";
import { Ingredient } from "../../../../core/domain/entitie/ingredient";
export class OrderDatabase implements OrderRepository {
  constructor(private readonly db: PrismaClient) {}

  async findAll(): Promise<any[]> {
    const orders = await this.db.order.findMany({
      include: {
        table: true,
        products: true,
        payment: true,
      },
    });
    return orders;
  }

  async findById(orderId: string): Promise<Order> {
    const order = await this.db.order.findUnique({
      where: { id: orderId },
      include: {
        table: true,
        products: {
          include: {
            product: true,
            increment: true,
          },
        },
        payment: true,
      },
    });
    if (!order) throw new Error("Order not found");
    const products = order.products.map((p) => ({
      product: new Product(p.product),
      quantity: p.quantity,
      increment: p.increment.map((e) => new Ingredient(e)),
    }));

    return new Order({
      id: orderId,
      price: order.price,
      products: products,
      startTimestamp: order.startTimestamp,
      endTimestamp: order.endTimestamp ?? null,
      status: order.status as "open" | "closed",
      table: new Table({
        id: order.table.id,
        name: order.table.name,
        status: order.table.status as "open" | "closed",
      }),
      payment: order.payment
        ? new Payment({
            amount: order.payment?.amount!,
            method: order.payment?.method!,
            orderId: order.payment?.orderId!,
            id: order.payment?.id!,
          })
        : null,
    });
  }

  async create(order: Order): Promise<Order> {
    await this.db.order.create({
      data: {
        id: order.get("id"),
        tableId: order.get("table").get("id"),
        startTimestamp: order.get("startTimestamp"),
        price: order.get("price"),
        status: order.get("status"),
        products: {
          create: order.get("products").map((p) => ({
            product: {
              connect: { id: p.product.get("id") },
            },
            quantity: p.quantity,
            increment: {
              connect: p.increment?.map((e) => ({ id: e.get("id") })),
            },
          })),
        },
      },
    });
    return order;
  }

  async update(order: Order): Promise<Order> {
    await this.db.saleProduct.deleteMany({
      where: {
        orderId: order.get("id"),
      },
    });
    await this.db.order.update({
      where: { id: order.get("id") },
      data: {
        tableId: order.get("table").get("id"),
        startTimestamp: order.get("startTimestamp"),
        endTimestamp: order.get("endTimestamp"),
        price: order.get("price"),
        status: order.get("status"),
        paymentId: order.get("payment")?.get("id") || null,
        products: {
          upsert: order.get("products").map((p) => ({
            where: { id: p.product.get("id") },
            update: {
              productId: p.product.get("id"),
              quantity: p.quantity,
              increment: p.increment
                ? {
                    set: p.increment.map((e) => ({ id: e.get("id") })),
                  }
                : undefined,
            },
            create: {
              product: {
                connect: { id: p.product.get("id") },
              },
              quantity: p.quantity,
              increment: p.increment
                ? {
                    connect: p.increment.map((e) => ({ id: e.get("id") })),
                  }
                : undefined,
            },
          })),
        },
      },
    });
    return order;
  }
}
