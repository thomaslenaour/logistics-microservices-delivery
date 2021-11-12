import axios from 'axios';
import { Injectable } from '@nestjs/common';

import { OrderEntity } from 'src/database/entities';
import { UpdateOrderDto } from 'src/dtos';

const orderApiUrl = 'https://blobfish-tech.herokuapp.com/api';
const clientApiUrl = 'https://fhemery-logistics.herokuapp.com/api/#/';

@Injectable()
export class OrderService {
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

    await Promise.all(
      orders.map(async (order) => {
        await axios.patch<UpdateOrderDto>(
          `${orderApiUrl}/order/${order.orderId}`,
          {
            status: 'pending',
          },
        );
      }),
    );
  }

  public async sendNotification(orders: OrderEntity[]) {
    await this.checkService();

    await Promise.all(
      orders.map(async (order) => {
        await axios.post<UpdateOrderDto>(
          `${clientApiUrl}/client-order/${order.orderId}`,
        );
      }),
    );
  }
}
