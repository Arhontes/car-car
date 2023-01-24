import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from '../products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { TripModule } from '../trip/trip.module';
import { PassengersModule } from '../passengers/passengers.module';

dotenv.config();

const mongoURI = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.cgaqtc2.mongodb.net/?retryWrites=true&w=majority`;

@Module({
  imports: [
    MongooseModule.forRoot(mongoURI),
    ProductsModule,
    UsersModule,
    AuthModule,
    TripModule,
    PassengersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
