import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { Passenger } from './shemas/passenger.shema';
import { UpdatePassengerDto } from './dto/update-passenger.dto';

@Controller('passengers')
export class PassengersController {
  constructor(private readonly passengersService: PassengersService) {}

  /*@Get(':passenger')
  async getOne(@Param('tripId') tripId: string): Promise<Trip> {
    return await this.passengersService.getById(tripId);
  }
  @Delete(':tripId')
  deleteOne(@Param('tripId') tripId: string): Promise<Trip> {
    return this.passengersService.remove(tripId);
  }*/
  @Post()
  async addPassenger(
    @Body() createPassengerDto: CreatePassengerDto,
  ): Promise<Passenger> {
    return await this.passengersService.addPassenger(createPassengerDto);
  }

  @Delete(':passengerId')
  async removePassenger(
    @Param('passengerId') passengerId: string,
  ): Promise<Passenger> {
    return await this.passengersService.removeByPassengerId(passengerId);
  }

  @Patch(':passengerId')
  async updateOne(
    @Param('passengerId') passengerId: string,
    @Body() updatePassengerDto: UpdatePassengerDto,
  ): Promise<Passenger> {
    return await this.passengersService.update(passengerId, updatePassengerDto);
  }
}
