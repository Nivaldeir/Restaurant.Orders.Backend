import { Socket } from "socket.io";
import { Channel, ServerSocketIOConnection } from "../../server";

export class DisconnectSocket implements ServerSocketIOConnection {
  getName(): Channel {
    return "disconnect";
  }

  getCallback(socket: Socket, msg: any) {
    console.log(`User disconnected: ${socket.id}`);
  }
}
