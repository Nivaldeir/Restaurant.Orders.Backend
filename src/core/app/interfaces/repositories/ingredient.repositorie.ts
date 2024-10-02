import { Ingredient } from "../../../domain/entitie/ingredient";

export interface IngredientRepository {
  getAll(): Promise<Ingredient[]>;
  create(ingredient: Ingredient): Promise<Ingredient>;
  findById(id: string): Promise<Ingredient>;
  update(ingredient: Ingredient): Promise<Ingredient>;
  delete(ingredient: Ingredient): Promise<void>;
}
