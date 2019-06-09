import { ReflectMetadata } from '@nestjs/common';

export enum RolesEnum {
  Admin = 'admin',
  User = 'user',
}

export const Roles = (...roles: RolesEnum[]) => ReflectMetadata('roles', roles);
