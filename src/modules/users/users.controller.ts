import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './shemas/user.shema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Patch(':userId')
  async updateOne(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(userId, updateUserDto);
  }
}
