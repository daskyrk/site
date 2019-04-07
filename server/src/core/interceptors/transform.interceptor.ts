import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { map } from 'rxjs/operators';

export interface Response {
  docs: object[];
  [prop: string]: any;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor<Response> {
  public intercept(context: ExecutionContext, next: CallHandler<Response>) {
    return next.handle().pipe(
      map(data => {
        if (data) {
          const { docs, ...rest } = data;
          if (docs) {
            return { data: { ...rest, list: docs }, success: true };
          }
        }
        return { data, success: true };
      }),
    );
  }
}
