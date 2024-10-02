import { Request, Response } from "express";
import {
  InputUpdateTableDTO,
  ITableService,
} from "../../../../../../core/app/interfaces/services/table";
import { Controller, HttpMethod, ResponseType } from "../controler";

export class UpdateTableController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: ITableService
  ) {}
  getHandler(): (
    request: Request<{ id: string }, {}, Omit<InputUpdateTableDTO, "id">>,
    response: Response<ResponseType>
  ) => Promise<void> {
    return async (request, response): Promise<void> => {
      try {
        const { id } = request.params;
        const { name, status } = request.body;
        const updated = await this.service.update({ id, name, status });
        response.status(204).json({
          message: "Table updated successfully",
          data: updated,
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
