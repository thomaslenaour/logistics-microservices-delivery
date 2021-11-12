import { OrderEntity } from '../../database/entities/order.entity';
import { UpdateOrderDto } from '../../dtos/order.dto';
import axios from 'axios';

const apiUrl = 'https://blobfish-tech.herokuapp.com/api';

export class OrderAction {
  public async checkService(): Promise<boolean> {
    try {
      require('axios');
      await axios.get(`${apiUrl}/ping`);
      return true;
    } catch {
      throw new Error('invalid service command');
    }
  }

  public async updateOrders(orders: OrderEntity[]) {
    await this.checkService();

    orders.map(async (order) => {
      await axios.patch<UpdateOrderDto>(`${apiUrl}/order/${order.orderId}`, {
        status: 'pending',
      });
    });
  }
}
