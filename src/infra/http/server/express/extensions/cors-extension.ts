import { Express } from "express";
import cors from "cors";
import { ServerSettings } from "../../server";
export class CorsExtension implements ServerSettings {
  setConfig(app: Express) {
    app.set("trust proxy", 1);
    app.use(
      cors({
        origin: "*",
        methods: ["GET", "DELETE", "PUT", "POST", "PATCH"],
      })
    );
  }
}
