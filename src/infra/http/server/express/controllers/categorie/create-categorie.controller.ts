import { Request, Response } from "express";
import { Controller, HttpMethod, ResponseType } from "../controler";
import { ICategorieService } from "../../../../../../core/app/interfaces/services/categorie";
type InputResponse = {
  name: string;
};
/**
 * @swagger
 * /categories:
 *   post:
 *     tags:
 *       - Categories
 *     description: Create a new category
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
 *                 example: "New Category"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category created successfully"
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
 *                         example: "New Category"
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
export class CreateCategorieController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: ICategorieService
  ) {}
  getHandler(): (
    request: Request<{}, {}, InputResponse, {}, Record<string, any>>,
    response: Response<ResponseType>
  ) => Promise<void> {
    return async (request, response): Promise<void> => {
      try {
        const { name } = request.body;
        const createdCategory = await this.service.create({ name });
        response.status(201).json({
          message: "Category created successfully",
          data: createdCategory,
        });
      } catch (error: any) {
        response.status(500).json({
          message: error?.message,
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
