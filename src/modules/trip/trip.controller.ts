import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Trip } from './shemas/trip.shema';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripsSearchEntities } from './dto/trips-search-entities';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PassengersService } from '../passengers/passengers.service';
import { PassengersSearchEntities } from '../passengers/dto/passengers-search-entities';

@Controller('trip')
export class TripController {
  constructor(
    private readonly tripService: TripService,
    private readonly passengersService: PassengersService,
  ) {}

  @Get(':tripId')
  async getOne(@Param('tripId') tripId: string): Promise<Trip> {
    const passengers = await this.passengersService.findPassengers({
      tripId,
    } as PassengersSearchEntities);
    const trip = await this.tripService.getById(tripId);

    trip.passengers = passengers;
    return trip;
  }
  @Delete(':tripId')
  async deleteOne(@Param('tripId') tripId: string): Promise<Trip> {
    const trip = await this.tripService.remove(tripId);
    await this.passengersService.removeAllByTripId(tripId);

    return trip;
  }
  @Post()
  async createOne(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    return await this.tripService.create(createTripDto);
  }
  @Get()
  async find(@Query() query: TripsSearchEntities): Promise<Trip[]> {
    return await this.tripService.findTrips(query);
  }

  @Patch(':tripId')
  updateOne(
    @Param('tripId') tripId: string,
    @Body() updateTripDto: UpdateTripDto,
  ): Promise<Trip> {
    return this.tripService.update(tripId, updateTripDto);
  }
}
