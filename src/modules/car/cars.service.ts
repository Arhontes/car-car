import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { Car, CarDocument } from './shemas/car.shema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarsSearchEntities } from './dto/cars-search-entities';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name)
    private carModel: Model<CarDocument>,
  ) {}

  async addCar(createCarDto: CreateCarDto): Promise<Car> {
    const newPassengers = new this.carModel(createCarDto);
    return newPassengers.save();
  }
  async findCars(query: CarsSearchEntities): Promise<Car[]> {
    return this.carModel.find({ ...query });
  }
}
