import { PrismaClient } from "@prisma/client";
import { CategorieRepository } from "../../../../core/app/interfaces/repositories/categorie.repositorie";
import { Categorie } from "../../../../core/domain/entitie/categorie";

export class CategorieDatabase implements CategorieRepository {
  constructor(private readonly db: PrismaClient) {}
  async findAll(): Promise<Categorie[]> {
    const categories = await this.db.category.findMany();
    return categories.map(
      (category) => new Categorie({ id: category.id, name: category.name })
    );
  }

  async findById(id: string): Promise<Categorie> {
    const category = await this.db.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new Error("Category not found");
    }
    return new Categorie({ id: category.id, name: category.name });
  }

  async create(categorie: Categorie): Promise<Categorie> {
    const createdCategory = await this.db.category.create({
      data: {
        id: categorie.get("id"),
        name: categorie.get("name"),
      },
    });
    return new Categorie({
      id: createdCategory.id,
      name: createdCategory.name,
    });
  }

  async update(categorie: Categorie): Promise<Categorie> {
    const updatedCategory = await this.db.category.update({
      where: { id: categorie.get("id") },
      data: {
        name: categorie.get("name"),
      },
    });
    return new Categorie({
      id: updatedCategory.id,
      name: updatedCategory.name,
    });
  }

  async delete(categorie: Categorie): Promise<void> {
    await this.db.category.delete({
      where: { id: categorie.get("id") },
    });
  }
}
