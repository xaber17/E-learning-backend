import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class ApiEndpointGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    const device_id: string = headers['x-device-id'];
    if (device_id) return true;
    return false;
  }
}
