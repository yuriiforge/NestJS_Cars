import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserSession } from '../users/users.controller';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<UserSession>();
    return !!request?.session?.id;
  }
}
