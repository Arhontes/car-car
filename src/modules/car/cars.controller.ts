import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './shemas/car.shema';
import { CarsSearchEntities } from './dto/cars-search-entities';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async addCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return await this.carsService.addCar(createCarDto);
  }

  @Get()
  async findCars(@Query() query: CarsSearchEntities): Promise<Car[]> {
    return await this.carsService.findCars(query);
  }
}
