import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Greeting, GreetingDocument } from './schemas/greeting.schema';
import { CreateGreetingDto } from './dto/create-greeting.dto';
import {
  HARDCODED_IDS,
  HARDCODED_GREETINGS,
} from 'src/common/db-dumps/greetings_16_03_2026';

@Injectable()
export class GreetingsService {
  constructor(
    @InjectModel(Greeting.name)
    private readonly greetingModel: Model<GreetingDocument>,
  ) {}

  async findAllGreetings() {
    try {
      const newFromDb = await this.greetingModel
        .find({ _id: { $nin: Array.from(HARDCODED_IDS) } })
        .sort({ createdAt: 1 })
        .lean()
        .exec();

      return [...HARDCODED_GREETINGS, ...newFromDb];
    } catch {
      return HARDCODED_GREETINGS;
    }
  }

  async createGreeting(dto: CreateGreetingDto): Promise<GreetingDocument> {
    return this.greetingModel.create(dto);
  }
}
