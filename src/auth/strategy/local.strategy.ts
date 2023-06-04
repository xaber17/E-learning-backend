import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  // HttpStatus,
  Injectable,
  // NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const [err, user] = await this.authService.validateUser(username, password);
    if (err) {
      // if (err.code === HttpStatus.UNAUTHORIZED) {
      throw new UnauthorizedException(err.message);
      // } else {
      // throw new NotFoundException(err.message);
      // }
    }
    return user;
  }
}
