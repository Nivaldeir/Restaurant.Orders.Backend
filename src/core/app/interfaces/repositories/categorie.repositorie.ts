import { Categorie } from "../../../domain/entitie/categorie";

export interface CategorieRepository {
  findAll(): Promise<Categorie[]>;
  findById(id: string): Promise<Categorie>;
  create(categorie: Categorie): Promise<Categorie>;
  update(categorie: Categorie): Promise<Categorie>;
  delete(categorie: Categorie): Promise<void>;
}
