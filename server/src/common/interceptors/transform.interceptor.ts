import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';

export interface Response {
  docs: object[];
  [prop: string]: any;
}

@Injectable()
export class TransformInterceptor
  implements NestInterceptor<Response> {
  public intercept(context: ExecutionContext, call$: Observable<Response>) {
    return call$.pipe(
      map(data => {
        const { docs, ...rest } = data;
        if (docs) {
          return { data: { ...rest, list: docs }, success: true };
        }
        return { data, success: true };
      }),
      catchError(err =>
        throwError(new HttpException('Message', HttpStatus.BAD_GATEWAY)),
      ),
    );
  }
}
