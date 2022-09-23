import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 as uuidv4 } from 'uuid';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();
    const responseId = uuidv4();
    const deviceId = request.headers['x-device-id'];
    const exceptionResponse = exception.getResponse();
    let responseMessage = exceptionResponse;
    if (typeof exceptionResponse === 'object' && exceptionResponse) {
      responseMessage = exceptionResponse['message'];
    }

    response.status(status).send({
      requestId: request.id,
      responseId,
      deviceId,
      timestamp: new Date().toISOString(),
      responseCode: status,
      responseStatus: HttpStatus[status],
      responseMessage,
      data: null,
    });
  }
}
