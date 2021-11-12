import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import { ShippingRequestDto } from '../dtos';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post()
  @HttpCode(204)
  async create(@Body() shippingRequestDto: ShippingRequestDto) {
    if (!shippingRequestDto.orderId || !shippingRequestDto.nbProducts) {
      throw new HttpException(
        'Bad request ! An ordre must have an orderId and nbProducts property.',
        400,
      );
    }

    await this.shippingService.create(shippingRequestDto);

    // TODO : Check for send orders
    const pendingOrders = await this.shippingService.getPendingOrder();

    const totalProducts = pendingOrders
      .map((order) => order.nbProducts)
      .reduce((acc, value) => acc + value);

    if (totalProducts >= 5) {
      console.log(
        `Hey ! We need to ship ${totalProducts} products for customers !`,
      );

      // Call patch method(pendingOrders)
    }
  }
}
