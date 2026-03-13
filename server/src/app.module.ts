import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';

import { GreetingsModule } from './greetings/greetings.module.js';
import { validateEnv } from './common/configs/env.validation.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('DB_URL'),
      }),
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 20 }]),
    GreetingsModule,
  ],
})
export class AppModule {}
