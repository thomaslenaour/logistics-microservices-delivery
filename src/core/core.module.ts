import type { Provider } from '@nestjs/common';
import { Global, Logger, Module } from '@nestjs/common';

import { ConfigService } from './services/config.service';

const loggerProvider: Provider<Logger> = {
  provide: Logger,
  useValue: new Logger('NestApplication'),
};

@Module({
  providers: [ConfigService, loggerProvider],
  exports: [ConfigService, loggerProvider],
})
@Global()
export class CoreModule {}
