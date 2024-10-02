import { PrismaClient } from "@prisma/client";
import { IFactoryServices } from "../interfaces/factory/factory-services";
import { IngredientRepository } from "../interfaces/repositories/ingredient.repositorie";
import { PaymentRepository } from "../interfaces/repositories/payment.repositorie";
import { ProductRepository } from "../interfaces/repositories/product.repositorie";
import { TableRepository } from "../interfaces/repositories/table.repositorie";
import { ICategorieService } from "../interfaces/services/categorie";
import { IIngredientService } from "../interfaces/services/ingredient";
import { IPaymentService } from "../interfaces/services/payment";
import { IProductService } from "../interfaces/services/product";
import { ITableService } from "../interfaces/services/table";
import { IOrderService } from "../interfaces/services/order";
import { OrderRepository } from "../interfaces/repositories/order.repositorie";
import { CategorieRepository } from "../interfaces/repositories/categorie.repositorie";
import { CategorieDatabase } from "../../../infra/database/prisma/repository/categorie";
import { ProductDatabase } from "../../../infra/database/prisma/repository/product";
import { TableDatabase } from "../../../infra/database/prisma/repository/table";
import { PaymentDatabase } from "../../../infra/database/prisma/repository/payment";
import { IngrendientDatabase } from "../../../infra/database/prisma/repository/ingrendient";
import { OrderDatabase } from "../../../infra/database/prisma/repository/order";
import { OrderService } from "../../domain/services/order.service";
import { PaymentService } from "../../domain/services/payment.service";
import { TableService } from "../../domain/services/table.service";
import { CategorieService } from "../../domain/services/categorie.service";
import { IngretientService } from "../../domain/services/ingretient.service";
import { ProductService } from "../../domain/services/product.service";

export class FactoryServices implements IFactoryServices {
  constructor(
    private readonly categorieRepository: CategorieRepository,
    private readonly productRepository: ProductRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly ingredientRepository: IngredientRepository,
    private readonly tableRepository: TableRepository,
    private readonly orderRepository: OrderRepository
  ) {}

  static create(db: PrismaClient): IFactoryServices {
    const categorieDatabase = new CategorieDatabase(db);
    const productDatabase = new ProductDatabase(db);
    const tableDatabase = new TableDatabase(db);
    const paymentDatabase = new PaymentDatabase(db);
    const ingredientDatabase = new IngrendientDatabase(db);
    const orderDatabase = new OrderDatabase(db);

    return new FactoryServices(
      categorieDatabase,
      productDatabase,
      paymentDatabase,
      ingredientDatabase,
      tableDatabase,
      orderDatabase
    );
  }
  order(): IOrderService {
    return new OrderService(
      this.orderRepository,
      new PaymentService(this.paymentRepository),
      new TableService(this.tableRepository),
      new ProductService(this.productRepository, this.ingredientRepository),
      new IngretientService(this.ingredientRepository)
    );
  }
  categorie(): ICategorieService {
    return new CategorieService(this.categorieRepository);
  }
  ingredient(): IIngredientService {
    return new IngretientService(this.ingredientRepository);
  }
  payment(): IPaymentService {
    return new PaymentService(this.paymentRepository);
  }
  product(): IProductService {
    return new ProductService(
      this.productRepository,
      this.ingredientRepository
    );
  }
  table(): ITableService {
    return new TableService(this.tableRepository);
  }
}
