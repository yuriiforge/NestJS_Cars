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
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body.email, body.password);
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
