import { randomUUID } from "crypto";
import { Table } from "./table";
import { Product } from "./product";
import { Ingredient } from "./ingredient";
import { Payment } from "./payment";
import { BaseEntity } from "./base";
type IncrementProduct = {
  increment?: Ingredient[];
  product: Product;
  quantity: number;
};

export type IOrder = {
  id: string;
  table: Table;
  products: IncrementProduct[];
  startTimestamp: Date;
  endTimestamp: Date | null;
  price: number;
  status: "open" | "closed";
  payment: Payment | null;
};

export class Order extends BaseEntity<IOrder> {
  private id: string;
  private table: Table;
  private products: IncrementProduct[];
  private startTimestamp: Date;
  private endTimestamp: Date | null = null;
  private price: number;
  private status: "open" | "closed";
  private payment: Payment | null = null;

  constructor(props: IOrder) {
    super();
    this.id = props.id;
    this.products = props.products;
    this.table = props.table;
    this.startTimestamp = props.startTimestamp;
    this.price = props.price;
    this.status = props.status;
    this.endTimestamp = props.endTimestamp || null;
    this.payment = props.payment || null;
  }
  setPayment(payment: Payment | null) {
    this.payment = payment;
  }
  setTable(table: Table) {
    this.table = table;
  }
  static create(table: Table) {
    return new Order({
      id: randomUUID(),
      products: [],
      table,
      startTimestamp: new Date(),
      payment: null,
      endTimestamp: null,
      price: 0,
      status: "open",
    });
  }

  private calculate() {
    let price = this.products.reduce((acc, curr) => {
      let someIncredient =
        curr.increment?.reduce((acc, curr) => {
          return acc + curr.get("price");
        }, 0) || 0;
      return acc + curr.product.get("price") * curr.quantity + someIncredient;
    }, 0);
    this.price = parseFloat(price.toFixed(2));
  }

  addProduct(product: IncrementProduct) {
    if (this.status === "closed") {
      throw new Error("Cannot add products to a closed order.");
    }
    this.products.push(product);
    this.calculate();
  }

  removeProduct(product: IncrementProduct) {
    if (this.status === "closed") {
      throw new Error("Cannot remove products from a closed order.");
    }
    if (
      this.products.some(
        (p) =>
          p.product.get("id") === product.product.get("id") &&
          p.increment === product.increment
      )
    ) {
      this.products = this.products.filter(
        (p) => p.product.get("id") !== product.product.get("id")
      );
      this.calculate();
    }
  }

  close() {
    if (this.status === "closed") {
      throw new Error("Order is already closed.");
    }
    this.endTimestamp = new Date();
    this.status = "closed";
    this.payment = Payment.create(this.price, "credit", this.id);
  }
}
