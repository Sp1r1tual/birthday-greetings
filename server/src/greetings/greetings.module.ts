import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Greeting, GreetingSchema } from './schemas/greeting.schema';
import { GreetingsController } from './greetings.controller';
import { GreetingsService } from './greetings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Greeting.name, schema: GreetingSchema },
    ]),
  ],
  controllers: [GreetingsController],
  providers: [GreetingsService],
})
export class GreetingsModule {}
