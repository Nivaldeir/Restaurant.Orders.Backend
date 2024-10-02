import { Request, Response } from "express";
import { Controller, HttpMethod, ResponseType } from "../controler";
import { IPaymentService } from "../../../../../../core/app/interfaces/services/payment";

export class FindAllPaymentController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: IPaymentService
  ) {}
  getHandler(): (
    request: Request,
    response: Response<ResponseType>
  ) => Promise<void> {
    return async (request, response): Promise<void> => {
      try {
        const created = await this.service.findAll();
        response.status(200).json({
          message: "Payments find with successfully",
          data: created,
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
