import { Module } from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { PingModule } from './ping/ping.module';
import { ShippingModule } from './shipping/shipping.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    PingModule,
    OrderModule,
    ShippingModule,
  ],
})
export class AppModule {}
