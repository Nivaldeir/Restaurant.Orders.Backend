import { Request, Response } from "express";
import { Controller, HttpMethod, ResponseType } from "../controler";
import { ICategorieService } from "../../../../../../core/app/interfaces/services/categorie";
/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categories
 *     description: Find many categories
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
 *                   example: "Category find with successfully"
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
 *                         example: "Category"
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
export class FindAllCategoriesController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: ICategorieService
  ) {}
  getHandler(): (
    request: Request<any>,
    response: Response<ResponseType>
  ) => Promise<void> {
    return async (request, response): Promise<void> => {
      try {
        const findCategories = await this.service.findAll();
        response.status(200).json({
          message: "Category find with successfully",
          data: findCategories,
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
