import { Request, Response } from "express";
import { Controller, HttpMethod, ResponseType } from "../controler";
import {
  IIngredientService,
  InputCreateIngredientDTO,
} from "../../../../../../core/app/interfaces/services/ingredient";

/**
 * @swagger
 * /ingredients:
 *   post:
 *     tags:
 *       - Ingredients
 *     description: Create a new Ingredient
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
 *                 example: "New Ingredient"
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
 *                   example: "Ingredient created successfully"
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
 *                         example: "New Ingredient"
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
export class CreateIngredientController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: IIngredientService
  ) {}
  getHandler(): (
    request: Request<{}, {}, InputCreateIngredientDTO>,
    response: Response<ResponseType>
  ) => Promise<void> {
    return async (request, response) => {
      try {
        const { name, price } = request.body;
        const created = await this.service.create({ name, price });
        response.status(201).json({
          message: "Ingredient created successfully",
          data: created,
        });
      } catch (error) {
        console.log(error)
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
