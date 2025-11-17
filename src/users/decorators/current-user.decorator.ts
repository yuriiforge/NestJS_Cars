import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserSession } from '../users.controller';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<UserSession>();
    return request.currentUser;
  },
);
