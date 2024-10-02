import { randomUUID } from "crypto";
import { BaseEntity } from "./base";

export type IIngredient = {
  id: string;
  name: string;
  price: number;
};
export class Ingredient extends BaseEntity<IIngredient> {
  private id: string;
  private name: string;
  private price: number;
  constructor(props: IIngredient) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
  }
  static create(name: string, price: number) {
    return new Ingredient({
      id: randomUUID(),
      name,
      price,
    });
  }

  setName(name: string) {
    this.name = name;
  }
  setPrice(price: number) {
    this.price = price;
  }
}
