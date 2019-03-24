import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  public intercept(context: ExecutionContext, call$: Observable<T>) {
    return call$.pipe(
      map(data => ({ data, success: true })),
      catchError(err =>
        throwError(new HttpException('Message', HttpStatus.BAD_GATEWAY)),
      ),
    );
  }
}
