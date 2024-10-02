import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { PaymentRepository } from "../../../../core/app/interfaces/repositories/payment.repositorie";
import { Payment } from "../../../../core/domain/entitie/payment";

export class PaymentDatabase implements PaymentRepository {
  constructor(private readonly db: PrismaClient) {}

  async findAll(): Promise<Payment[]> {
    const payments = await this.db.payment.findMany();
    return payments.map(
      (payment) =>
        new Payment({
          id: payment.id,
          orderId: payment.orderId,
          amount: payment.amount,
          method: payment.method,
        })
    );
  }

  async findbyId(id: string): Promise<Payment> {
    const payment = await this.db.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new Error(`Payment with id ${id} not found`);
    }

    return new Payment({
      id: payment.id,
      orderId: payment.orderId,
      amount: payment.amount,
      method: payment.method,
    });
  }

  async create(payment: Payment): Promise<void> {
    await this.db.payment.create({
      data: {
        id: payment.get("id"),
        orderId: payment.get("orderId"),
        amount: payment.get("amount"),
        method: payment.get("method"),
      },
    });
  }
}
