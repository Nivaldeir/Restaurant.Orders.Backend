import { Table } from "../../../domain/entitie/table";

export interface ITableService {
  create(data: InputCreateTableDTO): Promise<void>;
  update(data: InputUpdateTableDTO): Promise<void>;
  findAll(): Promise<Table[]>;
  findById(id: string): Promise<Table>;
  delete(data: InputDeleteTableDTO): Promise<void>;
}
type Status = "open" | "closed";
export type InputCreateTableDTO = {
  name: string;
};

export type InputUpdateTableDTO = {
  id: string;
  name?: string;
  status?: Status;
};
export type InputDeleteTableDTO = {
  id: string;
};
