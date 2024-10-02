import { Socket } from "socket.io";
import { Express } from "../server/express/express";

export interface Server {
  start: (port: number) => void;
  settings: (settings: ServerSettings[]) => void;
}

export interface ServerSettings {
  setConfig(app: any): void;
}

export interface ServerSocketIO {
  start: (app: Express) => void;
  createConnections(connections: ServerSocketIOConnection[]): void;
}

export interface ServerSocketIOConnection {
  getName(): Channel;
  getCallback(socket: Socket, msg: any): void;
}

export type Channel = "REQUEST_ORDER" | "UPDATER_ORDER" | "disconnect";
