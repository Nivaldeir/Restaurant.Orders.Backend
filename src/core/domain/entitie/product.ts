import { randomUUID } from "crypto";
import { Ingredient } from "./ingredient";
import { BaseEntity } from "./base";

export type IProduct = {
  id: string;
  name: string;
  price: number;
  categorieId: string;
  ingredients?: Ingredient[];
};
export class Product extends BaseEntity<IProduct> {
  private id: string;
  private name: string;
  private price: number;
  private categorieId: string;
  private ingredients: Ingredient[] = [];
  constructor(props: IProduct) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
    this.categorieId = props.categorieId;
    this.ingredients = props.ingredients || [];
  }
  static create(
    name: string,
    price: number,
    categorieId: string,
    ingredients: Ingredient[] = []
  ) {
    return new Product({
      id: randomUUID(),
      name,
      categorieId,
      price,
      ingredients,
    });
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
  setCategorieId(categorieId: string) {
    this.categorieId = categorieId;
  }
  setName(name: string) {
    this.name = name;
  }
  setPrice(price: number) {
    this.price = price;
  }
}
