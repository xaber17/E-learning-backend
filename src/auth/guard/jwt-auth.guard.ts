import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const activate = await super.canActivate(context);
    if (!activate) return false;
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    const prefix = 'Bearer ';
    let token: string = headers.authorization;
    if (token.startsWith(prefix)) {
      token = token.slice(prefix.length);
    }
    const isNotExpired = await this.authService.compareWithPreviousToken(token);
    return activate && isNotExpired;
  }
}
