import { Payment } from "../../../domain/entitie/payment";

export interface PaymentRepository {
  findAll(): Promise<Payment[]>;
  findbyId(id: string): Promise<Payment>;
  create(payment: Payment): Promise<void>;
}
