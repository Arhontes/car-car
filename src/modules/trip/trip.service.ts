import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip, TripDocument } from './shemas/trip.shema';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripsSearchEntities } from './dto/trips-search-entities';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripService {
  constructor(@InjectModel(Trip.name) private tripModel: Model<TripDocument>) {}

  async getById(tripId: string): Promise<Trip> {
    return this.tripModel.findOne({ tripId }).exec();
  }

  async create(tripDto: CreateTripDto): Promise<Trip> {
    const newTrip = new this.tripModel(tripDto);
    return newTrip.save();
  }

  async remove(tripId: string): Promise<Trip> {
    return this.tripModel.findOneAndRemove({ tripId });
  }

  async findTrips(query: TripsSearchEntities): Promise<Trip[]> {
    return this.tripModel.find({ ...query });
  }

  async update(tripId: string, updateTripDto: UpdateTripDto) {
    return await this.tripModel
      .findOneAndUpdate({ tripId }, updateTripDto, {
        new: true,
      })
      .exec();
  }
}
