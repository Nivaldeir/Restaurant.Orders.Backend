import { Socket } from "socket.io";
import { Channel, ServerSocketIOConnection } from "../../server";
import Injectable from "../../../../di/Injectable";
import { IFactoryServices } from "../../../../../core/app/interfaces/factory/factory-services";

export class UpdateOrderSocket implements ServerSocketIOConnection {
  @Injectable("FACTORY_SERVICES")
  services: IFactoryServices;

  getName(): Channel {
    return "UPDATER_ORDER";
  }

  async getCallback(socket: Socket, msg: any) {
    try {
      console.log(msg);
    } catch (error) {
      console.log(error);
    }
  }
}
