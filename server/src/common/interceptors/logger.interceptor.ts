import { tap } from 'rxjs/operators';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { BlogLogger } from '../../module/common/logger/logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: BlogLogger) {}

  public intercept(context: ExecutionContext, next: CallHandler<any>) {
    const ctx = GqlExecutionContext.create(context);
    const { fieldName } = ctx.getInfo();

    const now = Date.now();
    return next.handle().pipe(
      tap(
        () => this.logger.log(`${fieldName} SUCCESS ---- ${Date.now() - now}ms`),
        () => this.logger.error(`${fieldName} ERROR ---- ${Date.now() - now}ms`),
      ),
    );
  }
}
