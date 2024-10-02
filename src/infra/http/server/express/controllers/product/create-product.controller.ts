import { Request, Response } from "express";
import { Controller, HttpMethod } from "../controler";
import { IProductService } from "../../../../../../core/app/interfaces/services/product";

type InputResponse = {
  name: string;
  price: number;
  ingredients: string[];
  categorieId: string;
};
/**
 * @swagger
 * /product:
 *   post:
 *     tags:
 *       - Products
 *     description: create new product
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Queijo"
  *               price:
 *                 type: number
 *                 example: 20
  *               ingredients:
 *                 type: array
 *               categorieId:
 *                 type: string
 *                 example: "categorieId"
 * 
 * 
 *     responses:
 *       204:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product created successfully"
 *                 data:
 *                   type: object
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: "true"
 *                 message:
 *                   type: string
 *                   example: "An error occurred"
 *       500:
 *         description: Internal server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: "true"
 *                 message:
 *                   type: string
 */
export class CreateProductController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: IProductService
  ) {}
  getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (
      request: Request<{}, {}, InputResponse>,
      response: Response
    ) => {
      const { name, price, categorieId, ingredients } = request.body;
      await this.service.create({ name, price, categorieId, ingredients });
      response.status(201).send({
        error: false,
        message: "Produto criado com sucesso",
      });
    };
  }
  getPath(): string {
    return this.path;
  }
  getMethod(): "get" | "post" | "put" | "delete" {
    return this.method;
  }
}
