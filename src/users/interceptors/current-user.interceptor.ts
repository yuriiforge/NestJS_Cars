import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { UserSession } from '../users.controller';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest<UserSession>();
    const { id } = request.session || {};

    if (id) {
      const user = await this.usersService.findOne(id);
      if (user) {
        request.currentUser = user;
      }
    }

    return handler.handle();
  }
}
