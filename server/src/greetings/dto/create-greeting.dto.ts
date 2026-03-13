import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const CreateGreetingSchema = z.object({
  name: z.string().min(1, 'Name is required').max(40),
  city: z.string().min(1, 'City is required').max(30),
  greetings: z.string().min(1, 'Greeting message is required').max(200),
});

export class CreateGreetingDto extends createZodDto(CreateGreetingSchema) {}
