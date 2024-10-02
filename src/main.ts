import { PrismaClient } from "@prisma/client";
import { FactoryServices } from "./core/app/factory/factory-service";
import { Express } from "./infra/http/server/express/express";
import { ControllerFactory } from "./infra/http/server/express/factory/controller-factory";
import { CorsExtension } from "./infra/http/server/express/extensions/cors-extension";
import { SwaggerExtension } from "./infra/http/server/express/extensions/swagger-extension";
import { JWTExtension } from "./infra/http/server/express/extensions/jwt-extension";
import { SocketIO } from "./infra/http/server/socket/socker.io";
import { DisconnectSocket } from "./infra/http/server/socket/ons/disconnect.socket";
import { AwaitOrderSocket } from "./infra/http/server/socket/ons/request-order.socket";
import Registry from "./infra/di/registry";
import { CookiesParseExtension } from "./infra/http/server/express/extensions/cookies-parse";

const services = FactoryServices.create(new PrismaClient());
const registry = Registry.getInstance();
registry.provide("FACTORY_SERVICES", services);
const controllers = ControllerFactory.createControllers(services);
const server = new Express();
server.settings([
  new CookiesParseExtension(),
  new JWTExtension(),
  new CorsExtension(),
  new SwaggerExtension(),
]);
server.addControllers(controllers);
const socketIO = new SocketIO();
socketIO.start(server);
socketIO.createConnections([new DisconnectSocket(), new AwaitOrderSocket()]);
