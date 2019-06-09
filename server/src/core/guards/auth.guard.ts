import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // 在token middleware中设置的
    if (request.user) {
      return true;
    }
    throw new UnauthorizedException(
      `Forbidden to request path: ${request.path}`,
    );
  }
}
