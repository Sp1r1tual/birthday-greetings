import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from 'src/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') ?? 5000;
  const clientUrl =
    configService.get<string>('CLIENT_URL') ?? 'http://localhost:5173';

  app.enableCors({
    origin: clientUrl,
    credentials: true,
  });

  await app.listen(port);
}

void bootstrap();
