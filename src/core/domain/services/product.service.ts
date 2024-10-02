import { IngredientRepository } from "../../app/interfaces/repositories/ingredient.repositorie";
import { ProductRepository } from "../../app/interfaces/repositories/product.repositorie";
import {
  InputCreateProductDTO,
  InputDeleteProductDTO,
  InputUpdaterProductDTO,
  IProductService,
  OutputCreateProductDTO,
} from "../../app/interfaces/services/product";
import { Ingredient } from "../entitie/ingredient";
import { Product } from "../entitie/product";

export class ProductService implements IProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly ingredientRepository: IngredientRepository
  ) {}
  async create({
    ingredients = [],
    ...props
  }: InputCreateProductDTO): Promise<void> {
    const promises = ingredients.map(async (ingredient) => {
      let getIngredient = await this.ingredientRepository.findById(ingredient);
      if (!getIngredient) {
        return;
      }
      return getIngredient;
    });
    const ingredients_ = (await Promise.all(promises)) as Ingredient[];
    const product = Product.create(
      props.name,
      props.price,
      props.categorieId,
      ingredients_
    );
    await this.repository.create(product);
  }
  async findAll(): Promise<OutputCreateProductDTO[]> {
    const products = await this.repository.findAll();
    return products.map((product) => {
      return {
        id: product.get("id"),
        name: product.get("name"),
        price: product.get("price"),
        categorieId: product.get("categorieId"),
        ingredients: product.get("ingredients"),
      };
    });
  }
  async findById(id: string): Promise<OutputCreateProductDTO> {
    const product = await this.repository.findById(id);
    if (!product) {
    }
    return {
      id: product.get("id"),
      name: product.get("name"),
      price: product.get("price"),
      categorieId: product.get("categorieId"),
      ingredients: product.get("ingredients"),
    };
  }
  async update(data: InputUpdaterProductDTO): Promise<void> {
    const product = await this.repository.findById(data.id);
    if (!product) {
      throw new Error("Product not found");
    }
    if (data.ingredients) {
      const ingredients = data.ingredients?.map(async (ingredient) => {
        let getIngredient = await this.ingredientRepository.findById(
          ingredient
        );
        if (!getIngredient) {
          return;
        }
        return getIngredient;
      }) as any;
      product.addIngredients(ingredients);
    }
    await this.repository.update(product);
  }
  async delete(data: InputDeleteProductDTO): Promise<void> {
    const product = await this.repository.findById(data.id);
    if (!product) {
      throw new Error("Product not found");
    }
    await this.repository.delete(product.get("id"));
  }
}
