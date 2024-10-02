import { Request, Response } from "express";
import { Controller, HttpMethod, ResponseType } from "../controler";
import { IProductService } from "../../../../../../core/app/interfaces/services/product";

/**
 * @swagger
 * /product:
 *   get:
 *     tags:
 *       - Products
 *     description: Find many products
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Products find with successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123"
 *                       name:
 *                         type: string
 *                         example: "product"
 *                       price:
 *                         type: string
 *                         example: "product"
 *                       categorieId:
 *                         type: string
 *                         example: "categorieId"
 *                       ingredients:
 *                         type: array
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
export class FindAllProductController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: IProductService
  ) {}
  getHandler(): (request: Request<any>, response: Response<ResponseType>) => Promise<void> {
    return async (
      request: Request<{}, {}, {}>,
      response: Response
    ) => {
      const output = await this.service.findAll();
      response.status(200).send({
        message: "Produtos listados com sucesso",
        data: output,
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