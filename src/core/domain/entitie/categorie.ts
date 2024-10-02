import { randomUUID } from "crypto";
import { BaseEntity } from "./base";

export type ICategorie = {
  id: string;
  name: string;
};
export class Categorie extends BaseEntity<ICategorie> {
  private id: string;
  private name: string;
  constructor(props: ICategorie) {
    super();
    this.id = props.id;
    this.name = props.name;
  }
  static create(name: string) {
    return new Categorie({
      id: randomUUID(),
      name,
    });
  }
  setName(name: string) {
    this.name = name;
  }
}
