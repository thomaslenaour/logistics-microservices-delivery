import { OrderEntity } from '../../database/entities/order.entity';
import { UpdateOrderDto } from '../../dtos/order.dto';
import axios from 'axios';

const orderApiUrl = 'https://blobfish-tech.herokuapp.com/api';
const clientApiUrl = 'https://fhemery-logistics.herokuapp.com/api/#/';

export class OrderAction {
  public async checkService(): Promise<boolean> {
    try {
      require('axios');
      await axios.get(`${orderApiUrl}/ping`);
      return true;
    } catch {
      throw new Error('invalid service command');
    }
  }

  public async updateOrders(orders: OrderEntity[]) {
    await this.checkService();

    orders.map(async (order) => {
      await axios.patch<UpdateOrderDto>(
        `${orderApiUrl}/order/${order.orderId}`,
        {
          status: 'pending',
        },
      );
    });
  }

  public async sendNotification(orders: OrderEntity[]) {
    await Promise.all(
      orders.map(async (order) => {
        await axios.post<UpdateOrderDto>(
          `${clientApiUrl}/client-order/${order.orderId}`,
        );
      }),
    );
  }
}
