import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): string {
    return req.body?.nomorPegawai || req.ip;
  }
}
