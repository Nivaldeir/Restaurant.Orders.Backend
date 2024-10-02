import { Request, Response } from "express";
import { Controller, HttpMethod, ResponseType } from "../controler";
import { IIngredientService } from "../../../../../../core/app/interfaces/services/ingredient";
/**
 * @swagger
 * /ingredients:
 *   get:
 *     tags:
 *       - Ingredients
 *     description: Find many ingredients
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
 *                   example: "Ingredients find with successfully"
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
 *                         example: "Ingredients"
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
export class FindAllIngredientsController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: IIngredientService
  ) {}
  getHandler(): (
    request: Request<any>,
    response: Response<ResponseType>
  ) => Promise<void> {
    return async (request, response): Promise<void> => {
      try {
        const findAll = await this.service.findAll();
        console.log(findAll)
        response.status(200).json({
          message: "Table find with successfully",
          data: findAll,
        });
      } catch (error) {
        response.status(500).json({
          message: "An error occurred",
          error: true,
        });
      }
    };
  }
  getPath(): string {
    return this.path;
  }
  getMethod(): HttpMethod {
    return this.method;
  }
}
