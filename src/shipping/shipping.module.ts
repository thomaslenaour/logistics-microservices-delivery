import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { OrderService } from 'src/order/order.service';

import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';

@Module({
  imports: [DatabaseModule],
  providers: [ShippingService, OrderService],
  controllers: [ShippingController],
})
export class ShippingModule {}
