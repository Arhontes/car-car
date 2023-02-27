import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.CLIENT_URL || ' http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });
  await app.listen(port);
}

bootstrap();
