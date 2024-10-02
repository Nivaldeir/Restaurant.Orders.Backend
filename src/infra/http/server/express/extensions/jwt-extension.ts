import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction, Express } from "express";
import { ServerSettings } from "../../server";

export class JWTExtension implements ServerSettings {
  setConfig(app: Express): void {
    // app.use(this.config.bind(this)); // Certifique-se de que o `this` está vinculado corretamente
  }

  private async config(req: Request, res: Response, next: NextFunction) {
    try {
      const token =
        req.cookies["session-token"] ||
        req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ error: true, message: "Token not provided" });
      }

      const isValid = await this.validToken(token);
      if (!isValid) {
        return res.status(401).json({ error: true, message: "Invalid token" });
      }

      next();
    } catch (error: any) {
      return res.status(500).json({ error: true, message: error.message });
    }
  }

  private validToken(token: string): Promise<Output | null> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET || "123456789", (err, decoded) => {
        if (err) {
          console.error(err);
          resolve(null);
        } else {
          resolve(decoded as Output);
        }
      });
    });
  }
}

type Output = {
  id?: string;
  email: string;
  active: boolean;
  iat: number;
  exp: number;
};
