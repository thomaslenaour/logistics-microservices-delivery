import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';

import { DatabaseModule } from './database/database.module';
import { PingModule } from './ping/ping.module';
import { ShippingController } from './shipping/shipping.controller';
import { ShippingModule } from './shipping/shipping.module';

@Module({
  imports: [CoreModule, DatabaseModule, PingModule, ShippingModule],
  controllers: [ShippingController],
})
export class AppModule {}
