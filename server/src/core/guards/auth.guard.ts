import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { checkToken } from '@/utils/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
      const [type, token] = request.headers.authorization.split(' ');
      if (type === 'Bearer') {
        const encoded = checkToken(token);
        if (encoded) {
          request.user = encoded;
          return true;
        }
        throw new UnauthorizedException('token is invalid');
      }
      throw new UnauthorizedException('Authorization type invalid');
    }
    throw new UnauthorizedException(
      `missing Authorization header when request to ${request.path}`,
    );
  }
}
