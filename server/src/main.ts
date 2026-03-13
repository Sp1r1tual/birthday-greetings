import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express, Request, Response } from 'express';
import { IncomingMessage, ServerResponse } from 'http';

import { AppModule } from './app.module';

let cachedApp: Express;

async function createApp(): Promise<Express> {
  if (cachedApp) return cachedApp;

  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
  );

  const configService = app.get(ConfigService);
  const clientUrl = configService.get<string>('CLIENT_URL');

  app.enableCors({
    origin: clientUrl,
    credentials: true,
  });

  await app.init();

  cachedApp = expressApp;
  return cachedApp;
}

// Serverless handler (Vercel)
export default async (
  req: IncomingMessage | Request,
  res: ServerResponse | Response,
): Promise<void> => {
  const app = await createApp();
  app(req as Request, res as Response);
};

if (process.env.NODE_ENV !== 'production') {
  void createApp().then((expressApp) => {
    const port = process.env.PORT ?? 5000;
    expressApp.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  });
}
