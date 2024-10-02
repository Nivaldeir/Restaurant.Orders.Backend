import { Request, Response } from "express";
import { ICategorieService } from "../../../../../../core/app/interfaces/services/categorie";
import { Controller, HttpMethod } from "../controler";
type InputResponse = {
  id: string;
};
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     description: Delete the category
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the category to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Category deleted successfully"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "An error occurred"
 */
export class DeleteCategorieController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: ICategorieService
  ) {}
  getHandler(): (
    request: Request<InputResponse, {}, {}>,
    response: Response
  ) => Promise<void> {
    return async (request, response): Promise<void> => {
      const { id } = request.params;
      await this.service.delete({ id });
      response.status(200).send({
        error: false,
        message: "Categorie deleted successfully",
      });
    };
  }
  getPath(): string {
    return this.path;
  }
  getMethod(): HttpMethod {
    return this.method;
  }
}
