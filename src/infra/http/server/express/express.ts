import express from "express";
import { Server, ServerSettings } from "../server";
import { Controller } from "./controllers/controler";
import Logger from "../../../logger";

export class Express implements Server {
  private _server: express.Express;

  constructor() {
    this._server = express();
    this._server.use(express.json());
    this._server.use(express.urlencoded({ extended: true }));
  }

  settings(settings: ServerSettings[]) {
    settings.forEach((setting) => {
      setting.setConfig(this._server);
    });
  }

  start(port: number) {
    return this._server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  addControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      const path = controller.getPath();
      const method = controller.getMethod();
      const handler = controller.getHandler();
      Logger.instance.success(`[ ${method} ] ${path}`);
      this._server[method](path, handler);
    });
  }
}
