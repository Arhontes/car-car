import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import * as cookieParser from 'cookie-parser';

const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();
