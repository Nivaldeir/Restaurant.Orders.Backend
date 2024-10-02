import { Request, Response } from "express";
import { Controller, HttpMethod, ResponseType } from "../controler";
import { ITableService } from "../../../../../../core/app/interfaces/services/table";

type InputResponse = {
  name: string;
};
export class CreateTableController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: ITableService
  ) {}
  getHandler(): (
    request: Request<{}, {}, InputResponse>,
    response: Response<ResponseType>
  ) => Promise<void> {
    return async (request, response): Promise<void> => {
      try {
        const { name } = request.body;
        const created = await this.service.create({ name });

        response.status(201).json({
          message: "Table created successfully",
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
