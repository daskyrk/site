import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

const logger = new Logger();

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const { message, stack } = exception;

    logger.error(message, stack);

    response.status(status).json({
      message,
      success:false,
    });
  }
}
