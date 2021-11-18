import axios from 'axios';
import { Injectable } from '@nestjs/common';

import { OrderEntity, ProductEntity } from 'src/database/entities';
import { StockMovementDto, UpdateOrderDto } from 'src/dtos';

const orderApiUrl = 'https://blobfish-tech.herokuapp.com/api';
const clientApiUrl = 'https://fhemery-logistics.herokuapp.com/api/#/';
const stockApiUrl = 'https://logistics-microservices-stock.herokuapp.com/api';

@Injectable()
export class OrderService {
  public async checkService(apiUrl: string): Promise<boolean> {
    try {
      require('axios');
      await axios.get(`${apiUrl}/ping`);
      return true;
    } catch {
      throw new Error('invalid service command');
    }
  }

  public async updateOrders(orders: OrderEntity[]) {
    await this.checkService(orderApiUrl);

    const orderIdsCantBeDelivered = [];

    const readyOrders = await Promise.all(
      orders.map(async (order) => {
        const availableProducts = await this.checkProductStock(order.products);
        if (!availableProducts) {
          orderIdsCantBeDelivered.push(order.orderId);
        }
        try {
          await axios.patch<UpdateOrderDto>(
            `${orderApiUrl}/order/${order.orderId}`,
            {
              status: 'pending',
            },
          );
        } catch (err) {
          orderIdsCantBeDelivered.push(order.orderId);
        }
        return order;
      }),
    );

    return readyOrders.filter(
      (order) => !orderIdsCantBeDelivered.includes(order.orderId),
    );
  }

  public async sendNotification(orders: OrderEntity[]) {
    await this.checkService(clientApiUrl);

    await Promise.all(
      orders.map(async (order) => {
        await axios.post<UpdateOrderDto>(
          `${clientApiUrl}/client-order/${order.orderId}`,
        );
      }),
    );
  }

  public async checkProductStock(products: ProductEntity[]): Promise<boolean> {
    await this.checkService(stockApiUrl);

    let isAvailable = true;
    await Promise.all(
      products.map(async (product) => {
        const stockMovement: StockMovementDto = {
          productId: product.productId,
          quantity: product.quantity,
          status: 'Removal',
        };
        const { data } = await axios.post(
          `${stockApiUrl}/stock/${product.productId}/movement`,
          stockMovement,
        );
        if (data.status_code === 400) {
          isAvailable = false;
        }
      }),
    );

    console.log('isAvailable', isAvailable);

    return isAvailable;
  }
}
