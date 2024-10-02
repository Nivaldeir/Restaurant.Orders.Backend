import { Request, Response } from "express";
import { Controller, HttpMethod, ResponseType } from "../controler";
import { IOrderService } from "../../../../../../core/app/interfaces/services/order";

/**
 * @swagger
 * /orders:
 *   post:
 *     tags:
 *       - Orders
 *     description: Create a new Order
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
 *                 example: "New Orders"
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
 *                   example: "Orders created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123"
 *                     startTimestamp: 
 *                        type: string
 *                        example: "2022-08-28T00:00:00.000Z"
 *                     status:
 *                        type: string
 *                        example: "open"
 *                     table:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           name: "Table 1"
 *                         name:
 *                           type: string
 *                           name: "Table 1"
 *                         status:
 *                           type: string
 *                           name: "closed"
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
export class CreateOrderController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: IOrderService
  ) {}
  getHandler(): (
    request: Request<any>,
    response: Response<ResponseType>
  ) => Promise<void> {
    return async (request: Request<any>, response: Response<ResponseType>) => {
      try {
        const { tableId } = request.body;
        const created = await this.service.create({
          tableId,
        });
        response.status(201).json({
          message: "Order created successfully",
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
