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

@Controller('trip')
export class TripController {
  constructor(
    private readonly tripService: TripService,
    private readonly passengersService: PassengersService,
  ) {}

  @Get(':tripId')
  async getOne(@Param('tripId') tripId: string): Promise<Trip> {
    const passengers = await this.passengersService.findAllPassengersByTripId(
      tripId,
    );
    const trip = await this.tripService.getById(tripId);

    trip.passengers = passengers;
    return trip;
  }
  @Delete(':tripId')
  deleteOne(@Param('tripId') tripId: string): Promise<Trip> {
    return this.tripService.remove(tripId);
  }
  @Post()
  async createOne(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    const trip = await this.tripService.create(createTripDto);

    return trip;
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
