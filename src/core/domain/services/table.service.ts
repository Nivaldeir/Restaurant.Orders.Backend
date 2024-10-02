import { TableRepository } from "../../app/interfaces/repositories/table.repositorie";
import {
  InputCreateTableDTO,
  InputDeleteTableDTO,
  InputUpdateTableDTO,
  ITableService,
} from "../../app/interfaces/services/table";
import { Table } from "../entitie/table";

export class TableService implements ITableService {
  constructor(private repository: TableRepository) {}
  findById(id: string): Promise<Table> {
    const table = this.repository.findById(id);
    if (!table) {
      throw new Error("Table not found");
    }
    return table;
  }
  async create(data: InputCreateTableDTO): Promise<void> {
    const table = Table.create(data.name);
    await this.repository.create(table);
  }
  async update(data: InputUpdateTableDTO): Promise<void> {
    const table = await this.repository.findById(data.id);
    if (!table) {
      throw new Error("Table not found");
    }
    if (data.status) table.setStatus(data.status);
    if (data.name) table.setName(data?.name);
    await this.repository.update(table);
  }
  async findAll(): Promise<Table[]> {
    const tables = await this.repository.findAll();
    return tables;
  }
  async delete(data: InputDeleteTableDTO): Promise<void> {
    const table = await this.repository.findById(data.id);
    if (!table) {
      throw new Error("Table not found");
    }
    await this.repository.delete(table.get("id"));
  }
}
