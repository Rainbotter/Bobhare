import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SETTINGS } from '../config/settings.config';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {
  }

  public async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header(SETTINGS.APPLICATION.AUTH.HEADER);
    if (!authHeader) {
      throw new ForbiddenException('Auth header is not present');
    }
    if (this.authService.auth(authHeader)) {
      next();
    } else {
      throw new ForbiddenException('not authenticated');
    }
  }
}
