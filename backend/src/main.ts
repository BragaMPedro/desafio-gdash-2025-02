import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger("main.ts/bootstrap");
  const app = await NestFactory.create(AppModule);
  const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:5173';

  !process.env.FRONTEND_URL &&
    logger.warn(
      'FRONTEND_URL not set in environment variables. Using default localhost URL.',
    );

  app.enableCors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.API_PORT ?? 3000);
}
bootstrap();
