import { Injectable } from '@nestjs/common';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

import type { Environment } from './environment.type';

@Injectable()
export class ConfigService {
  public get databaseConfiguration(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: 'database.sqlite',
      logging: true,
      synchronize: true,
    };
  }
}
