import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class AuthThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): string {
    return `${req.body?.nomorPegawai}-${req.headers['x-device-id']}`;
  }
}
