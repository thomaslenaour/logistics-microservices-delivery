import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';

@Module({
  imports: [DatabaseModule],
  providers: [ShippingService],
  controllers: [ShippingController]
})
export class ShippingModule {}
