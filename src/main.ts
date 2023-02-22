import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:false});
  app.use(cookieParser());
  /*app.enableCors({
    origin: "https://onega-go.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  });*/
  await app.listen(port);
}

bootstrap();
