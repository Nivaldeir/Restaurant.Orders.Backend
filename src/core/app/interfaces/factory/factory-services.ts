import { ICategorieService } from "../services/categorie";
import { IIngredientService } from "../services/ingredient";
import { IOrderService } from "../services/order";
import { IPaymentService } from "../services/payment";
import { IProductService } from "../services/product";
import { ITableService } from "../services/table";

export interface IFactoryServices {
  categorie(): ICategorieService;
  ingredient(): IIngredientService;
  payment(): IPaymentService;
  product(): IProductService;
  table(): ITableService;
  order(): IOrderService;
}
