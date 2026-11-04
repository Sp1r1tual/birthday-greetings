import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

import { CreateGreetingDto } from './dto/create-greeting.dto';
import { GreetingsService } from './greetings.service';

@Controller('greetings')
@UsePipes(ZodValidationPipe)
export class GreetingsController {
  constructor(private readonly greetingsService: GreetingsService) {}

  @Get()
  async findAll() {
    const { greetings, isFallback } =
      await this.greetingsService.findAllGreetings();
    return { Greetings: greetings, IsFallback: isFallback };
  }

  @Post()
  async create(@Body() dto: CreateGreetingDto) {
    const greeting = await this.greetingsService.createGreeting(dto);
    return { Greeting: greeting };
  }
}
