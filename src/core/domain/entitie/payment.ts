import { randomUUID } from "crypto";
import { BaseEntity } from "./base";

export type IPayment = {
  id: string;
  amount: number;
  method: string;
  orderId: string;
};
export class Payment extends BaseEntity<IPayment>{
  private id: string;
  private orderId: string;
  private amount: number;
  private method: string;

  constructor(props: IPayment) {
    super()
    this.id = props.id;
    this.amount = props.amount;
    this.method = props.method;
    this.orderId = props.orderId;
  }
  static create(amount: number, method: string, orderId: string): Payment {
    return new Payment({
      id: randomUUID(),
      amount,
      orderId,
      method,
    });
  }
}
