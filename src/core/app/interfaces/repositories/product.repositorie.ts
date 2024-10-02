import { Product } from "../../../domain/entitie/product";

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}
