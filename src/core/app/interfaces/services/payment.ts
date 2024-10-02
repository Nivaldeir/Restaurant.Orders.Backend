import { Payment } from "../../../domain/entitie/payment";

export interface IPaymentService {
  create(data: InputCreatePaymentDTO): Promise<Payment>;
  findAll(): Promise<OutputFindAllPaymentDTO[]>;
  findById(id: string): Promise<OutputFindAllPaymentDTO>;
}
export type InputCreatePaymentDTO = {
  orderId: string;
  amount: number;
  method: string;
};

export type OutputFindAllPaymentDTO = {
  id: string;
  orderId: string;
  amount: number;
  method: string;
};