import { Table } from "../../../domain/entitie/table";

export interface TableRepository {
  findAll(): Promise<Table[]>;
  findById(id:string): Promise<Table>;
  create(table: Table): Promise<void>;
  update(table: Table): Promise<void>;
  delete(id: string): Promise<void>;
}