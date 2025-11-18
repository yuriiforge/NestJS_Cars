import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

interface CurrentUserPayload {
  id: number | null;
}
export interface UserSession extends Request {
  session?: {
    id?: number | null;

    [key: string]: any;
  };
  currentUser: User;
}

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get('whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('signout')
  signOut(@Session() session: CurrentUserPayload) {
    session.id = null;
  }

  @Post('signup')
  async createUser(
    @Body() body: CreateUserDto,
    @Session() session: CurrentUserPayload,
  ) {
    const user = await this.authService.signup(body.email, body.password);
    session.id = user.id;

    return user;
  }

  @Post('signin')
  async signInUser(
    @Body() body: CreateUserDto,
    @Session() session: CurrentUserPayload,
  ) {
    const user = await this.authService.signin(body.email, body.password);
    session.id = user.id;

    return user;
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
