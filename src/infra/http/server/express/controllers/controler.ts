import { Request, Response } from "express";

export type HttpMethod = "get" | "post" | "put" | "delete";
export const HttpMethod = {
  GET: "get" as const,
  POST: "post" as const,
  PUT: "put" as const,
  DELETE: "delete" as const,
} as const;
export interface Controller {
  getHandler(): (
    request: Request<any>,
    response: Response<ResponseType>
  ) => Promise<void>;
  getPath(): string;
  getMethod(): HttpMethod;
}

export type ResponseType =
  | {
      error: boolean;
      message: string;
    }
  | {
      data: any;
    };
