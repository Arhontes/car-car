import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Passenger, PassengerDocument } from './shemas/passenger.shema';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';

@Injectable()
export class PassengersService {
  constructor(
    @InjectModel(Passenger.name)
    private passengerModel: Model<PassengerDocument>,
  ) {}

  async getPassengerByPassengerId(passengerId: string): Promise<Passenger> {
    return this.passengerModel.findOne({ passengerId }).exec();
  }

  async addPassenger(passengerDto: CreatePassengerDto): Promise<Passenger> {
    const newTrip = new this.passengerModel(passengerDto);
    return newTrip.save();
  }

  async removeByPassengerId(passengerId): Promise<Passenger> {
    return this.passengerModel.findOneAndRemove({ passengerId });
  }

  async removeAllByTripId(tripId): Promise<Passenger> {
    return this.passengerModel.findOneAndRemove({ tripId });
  }

  async findAllPassengersByTripId(tripId: string): Promise<Passenger[]> {
    return this.passengerModel.find({ tripId });
  }

  async update(
    passengerId,
    updatePassengerDto: UpdatePassengerDto,
  ): Promise<Passenger> {
    return await this.passengerModel
      .findOneAndUpdate({ passengerId }, updatePassengerDto, {
        new: true,
      })
      .exec();
  }
}
