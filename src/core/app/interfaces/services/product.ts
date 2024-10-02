import { Ingredient } from "../../../domain/entitie/ingredient";

export interface IProductService {
  create(data: InputCreateProductDTO): Promise<void>;
  findAll(): Promise<OutputCreateProductDTO[]>;
  findById(id: string): Promise<OutputCreateProductDTO>;
  update(data: InputUpdaterProductDTO): Promise<void>;
  delete(data: InputDeleteProductDTO): Promise<void>;
}

export type InputCreateProductDTO = {
  name: string;
  price: number;
  categorieId: string;
  ingredients?: string[];
};

export type OutputCreateProductDTO = {
  id: string;
  name: string;
  price: number;
  categorieId: string;
  ingredients?: Ingredient[];
};

export type InputUpdaterProductDTO = {
  id: string;
  name?: string;
  price?: number;
  categorieId?: string;
  ingredients?: string[];
};

export type InputDeleteProductDTO = {
  id: string;
};
