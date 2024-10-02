import { Ingredient } from "../../../domain/entitie/ingredient";

export interface IIngredientService {
  create(data: InputCreateIngredientDTO): Promise<void>;
  update(data: InputUpdateIngredientDTO): Promise<void>;
  findAll(): Promise<OutputFindAllIngredientDTO[]>;
  findById(id: string): Promise<Ingredient>;
  delete(data: InputDeleteIngredientDTO): Promise<void>;
}

export type InputCreateIngredientDTO = {
  name: string;
  price: number;
};

export type OutputFindAllIngredientDTO = {
  id: string;
  name: string;
  price: number;
};
export type InputUpdateIngredientDTO = {
  id: string;
  name?: string;
  price?: number;
};
export type InputDeleteIngredientDTO = {
  id: string;
};
