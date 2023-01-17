import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from './shemas/trip.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
  ],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}