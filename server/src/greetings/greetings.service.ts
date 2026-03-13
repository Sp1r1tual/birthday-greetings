import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Greeting, GreetingDocument } from './schemas/greeting.schema';
import { CreateGreetingDto } from './dto/create-greeting.dto';

@Injectable()
export class GreetingsService {
  constructor(
    @InjectModel(Greeting.name)
    private readonly greetingModel: Model<GreetingDocument>,
  ) {}

  async findAllGreetings(): Promise<GreetingDocument[]> {
    const greetings = await this.greetingModel
      .find()
      .sort({ createdAt: -1 })
      .exec();

    if (greetings.length === 0) {
      throw new NotFoundException('No records found');
    }

    return greetings;
  }

  async createGreeting(dto: CreateGreetingDto): Promise<GreetingDocument> {
    return this.greetingModel.create(dto);
  }
}
