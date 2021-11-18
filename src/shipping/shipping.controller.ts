import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';

import { OrderService } from 'src/order/order.service';
import { ShippingRequestDto } from '../dtos';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
  constructor(
    private readonly shippingService: ShippingService,
    private readonly orderService: OrderService,
  ) {}

  @Post()
  @HttpCode(204)
  async create(@Body() shippingRequestDto: ShippingRequestDto) {
    if (
      !shippingRequestDto.orderId ||
      !shippingRequestDto.nbProducts ||
      !shippingRequestDto.products
    ) {
      throw new HttpException(
        'Bad request ! An ordre must have an orderId and nbProducts property.',
        400,
      );
    }

    await this.shippingService.create(shippingRequestDto);

    const pendingOrders = await this.shippingService.getPendingOrder();
    const totalProducts = pendingOrders
      .map((order) => order.nbProducts)
      .reduce((acc, value) => acc + value);

    if (totalProducts >= 5) {
      try {
        const readyOrders = await this.orderService.updateOrders(pendingOrders);
        const editedOrders = await this.shippingService.updatePendingOrders(
          readyOrders,
        );
        await this.orderService.sendNotification(editedOrders);
      } catch (error) {
        console.log('erorrr');
      }
    }
  }
}
