import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';

import { DatabaseModule } from './database/database.module';
import { PingModule } from './ping/ping.module';

@Module({
  imports: [CoreModule, DatabaseModule, PingModule],
})
export class AppModule {}
