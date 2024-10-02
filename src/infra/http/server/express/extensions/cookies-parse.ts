import { ServerSettings } from "../../server";
import cookieParser from "cookie-parser";
export class CookiesParseExtension implements ServerSettings {
  setConfig(app: any): void {
    app.use(cookieParser());
  }
}