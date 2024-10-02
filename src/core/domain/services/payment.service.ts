import { PaymentRepository } from "../../app/interfaces/repositories/payment.repositorie";
import {
  InputCreatePaymentDTO,
  IPaymentService,
  OutputFindAllPaymentDTO,
} from "../../app/interfaces/services/payment";
import { Payment } from "../entitie/payment";

export class PaymentService implements IPaymentService {
  constructor(private readonly repository: PaymentRepository) {}
  async create(data: InputCreatePaymentDTO): Promise<Payment> {
    const payment = Payment.create(data.amount, data.method, data.orderId);
    console.log(payment);
    await this.repository.create(payment);
    return payment;
  }
  async findAll(): Promise<OutputFindAllPaymentDTO[]> {
    const payments = await this.repository.findAll();
    return payments.map((payment) => ({
      id: payment.get("id"),
      amount: payment.get("amount"),
      method: payment.get("method"),
      orderId: payment.get("orderId"),
    }));
  }
  async findById(id: string): Promise<OutputFindAllPaymentDTO> {
    const payment = await this.repository.findbyId(id);
    return {
      amount: payment.get("amount"),
      method: payment.get("method"),
      orderId: payment.get("orderId"),
      id: payment.get("id"),
    };
  }
}
