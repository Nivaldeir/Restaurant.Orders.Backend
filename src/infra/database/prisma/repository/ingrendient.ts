import { PrismaClient } from "@prisma/client";
import { IngredientRepository } from "../../../../core/app/interfaces/repositories/ingredient.repositorie";
import { Ingredient } from "../../../../core/domain/entitie/ingredient";

export class IngrendientDatabase implements IngredientRepository {
  constructor(private readonly db: PrismaClient) {}
  async getAll(): Promise<Ingredient[]> {
    const ingredient = await this.db.ingredient.findMany();
    if (!ingredient) {
      throw new Error("Ingredient not found");
    }
    return ingredient.map((e) => new Ingredient(e));
  }
  async create(ingredient: Ingredient): Promise<Ingredient> {
    await this.db.ingredient.create({
      data: {
        name: ingredient.get("name"),
        price: ingredient.get("price"),
      },
    });
    return ingredient;
  }
  async findById(id: string): Promise<Ingredient> {
    const ingredient = await this.db.ingredient.findUnique({
      where: {
        id: id,
      },
    });
    if (!ingredient) {
      throw new Error("Ingredient not found");
    }
    return new Ingredient({
      id: ingredient.id,
      name: ingredient.name,
      price: ingredient.price,
    });
  }
  update(ingredient: Ingredient): Promise<Ingredient> {
    throw new Error("Method not implemented.");
  }
  delete(ingredient: Ingredient): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
