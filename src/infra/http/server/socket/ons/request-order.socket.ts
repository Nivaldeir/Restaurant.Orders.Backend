import { Socket } from "socket.io";
import { Channel, ServerSocketIOConnection } from "../../server";
import Injectable from "../../../../di/Injectable";
import { IFactoryServices } from "../../../../../core/app/interfaces/factory/factory-services";

export class AwaitOrderSocket implements ServerSocketIOConnection {
  @Injectable("FACTORY_SERVICES")
  services: IFactoryServices;

  getName(): Channel {
    return "REQUEST_ORDER";
  }

  async getCallback(socket: Socket, msg: InputProps) {
    try {
      await this.services.order().adding({
        orderId: msg.orderId,
        products: msg.products,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

type InputProps = {
  orderId: string;
  products: any[];
  table: string;
};
