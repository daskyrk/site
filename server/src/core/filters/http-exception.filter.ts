import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

const logger = new Logger('Exception filter');

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const errorRes = exception.getResponse();
    if (typeof errorRes === 'object') {
      const { message, statusCode, error } = errorRes as any;

      // logger.error(error);

      response.status(statusCode).json({
        message: error,
        success: false,
      });
    } else {
      response.status(exception.getStatus()).json({
        message: exception.message,
        success: false,
      });
    }
  }
}
