import { Express, Request, Response } from "express";
import redoc from "redoc-express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../../../../../package.json";
import { ServerSettings } from "../../server";

export class SwaggerExtension implements ServerSettings {
  private setupSwagger(app: Express) {
    const options: swaggerJsDoc.Options = {
      failOnErrors: true,
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Hello World",
          version,
        },
        components: {
          securitySchemes: {
            BearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [
          {
            BearerAuth: [],
          },
        ],
      },
      apis: ["./src/infra/http/server/express/controllers/**/*.ts"],
    };
    const swaggerSpec = swaggerJsDoc(options);

    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("/docs.json", (req: Request, res: Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
  }

  private setupRedoc(app: Express) {
    app.use(
      "/docs",
      redoc({
        title: "Documentação",
        specUrl: "/docs.json",
        nonce: "",
        redocOptions: {
          theme: {
            colors: {
              primary: {
                main: "#6EC5AB",
              },
            },
            typography: {
              fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
              fontSize: "15px",
              lineHeight: "1.5",
              code: {
                code: "#87E8C7",
                backgroundColor: "#4D4D4E",
              },
            },
            menu: {
              backgroundColor: "#ffffff",
            },
          },
        },
      })
    );
  }

  setConfig(app: Express) {
    this.setupSwagger(app);
    this.setupRedoc(app);
  }
}
