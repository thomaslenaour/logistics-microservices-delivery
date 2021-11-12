import { Module } from '@nestjs/common';

import { PingController } from './ping/ping.controller';

@Module({
  imports: [],
  controllers: [PingController],
})
export class AppModule {}
