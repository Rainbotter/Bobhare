import { Injectable, Logger } from '@nestjs/common';
import { SETTINGS } from '../../config/settings.config';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);

  public auth(password: string): boolean {
    return password === SETTINGS.APPLICATION.AUTH.PASSWORD;
  }
}
