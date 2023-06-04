import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { FastifyRequest, FastifyReply } from 'fastify';
import { map } from 'rxjs/operators';

@Injectable()
export class BaseResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const response = context.switchToHttp().getResponse<FastifyReply>();
    const responseId = uuidv4();
    const deviceId = request.headers['x-device-id'];
    request.log.info({ responseId, deviceId });
    return next.handle().pipe(
      map((data) => {
        return {
          requestId: request.id,
          responseId,
          deviceId,
          timestamp: new Date().toISOString(),
          responseCode: data.code || response.statusCode,
          responseStatus: HttpStatus[data.code || response.statusCode],
          responseMessage: data.message,
          data: data.result,
        };
      }),
    );
  }
}
