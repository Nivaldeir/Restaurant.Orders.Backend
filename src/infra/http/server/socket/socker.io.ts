import { ServerSocketIO, ServerSocketIOConnection } from "../server";
import { Server } from "socket.io";
import { Express } from "../express/express";
export class SocketIO implements ServerSocketIO {
  private socket: Server;
  start(app: Express) {
    this.socket = new Server(app.start(8080));
  }
  createConnections(connections: ServerSocketIOConnection[]): void {
    this.socket.on("connection", (socket) => {
      connections.forEach((connection) => {
        socket.on(connection.getName(), (msg: any) => connection.getCallback.bind(connection)(socket, msg));
      });
    });
  }
}
