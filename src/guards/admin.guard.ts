import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserSession } from '../users/users.controller';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<UserSession>();
    if (!request.currentUser) {
      return false;
    }
    return request.currentUser.admin;
  }
}
