import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      emailField: 'nomorPegawai',
      passwordField: 'password',
    });
  }

  async validate(loginId: string, password: string): Promise<any> {
    const [err, user] = await this.authService.validateUser(loginId, password);
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
