import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    // 通过Reflect从目标上取出@Roles装饰器添加的数据
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => user.roles.some((role: string) => roles.includes(role));
    const hasPerm = user && user.roles && hasRole();
    if (!hasPerm) {
      throw new ForbiddenException('Forbidden resources for current user');
    }
    return true;
  }
}
