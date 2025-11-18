import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

declare module 'express' {
  interface Request {
    currentUser?: User | null;
    session?: {
      id?: number | null;
      [key: string]: any;
    };
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.session || {};

    if (id) {
      const user = await this.usersService.findOne(id);
      req.currentUser = user;
    }

    next();
  }
}
