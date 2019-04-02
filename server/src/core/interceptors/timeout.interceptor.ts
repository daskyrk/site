import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      timeout(5000),
      catchError(error => {
        if (error.name === 'TimeoutError') {
          return [
            throwError(
              new HttpException('Timeout', HttpStatus.GATEWAY_TIMEOUT),
            ),
          ];
        }
        throw error;
      }),
    );
  }
}
