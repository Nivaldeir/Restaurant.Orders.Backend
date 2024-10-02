import { randomUUID } from "crypto";
import { BaseEntity } from "./base";

type Status = "open" | "closed";
export type ITable = {
  id: string;
  name: string;
  status: Status;
};
export class Table extends BaseEntity<ITable> {
  private id: string;
  private name: string;
  private status: Status;
  constructor(props: ITable) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.status = props.status;
  }
  static create(name: string) {
    return new Table({
      id: randomUUID(),
      name,
      status: "open",
    });
  }

  setStatus(status: Status) {
    this.status = status;
  }
  setName(name: string) {
    this.name = name;
  }
}
