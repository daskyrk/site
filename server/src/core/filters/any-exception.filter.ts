import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  public catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof HttpException) {
      const errorRes = exception.getResponse();
      if (typeof errorRes === 'object') {
        const { message, statusCode, error } = errorRes as any;
        return response.status(statusCode).json({
          message: message || error,
          success: false,
        });
      } else {
        return response.status(exception.getStatus()).json({
          message: exception.message,
          success: false,
        });
      }
    }

    // 普通抛错封装到200返回中
    return response.status(HttpStatus.OK).json({
      message: exception.message,
      success: false,
    });

  }
}
