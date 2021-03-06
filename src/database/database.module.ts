import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreModule } from '../core/core.module';
import { ConfigService } from '../core/services/config.service';
import * as Entities from './entities';

const entities = Object.values(Entities);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [CoreModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.databaseConfiguration,
        entities,
      }),
    }),
    TypeOrmModule.forFeature(entities),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
