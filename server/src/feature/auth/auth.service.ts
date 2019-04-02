import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async createToken() {
    const user: JwtPayload = { email: 'user@email.com' };
    return jwt.sign(user, 'secretKey', { expiresIn: 3600 });
  }

  // public async validateUser(payload: JwtPayload): Promise<any> {
  //   return await this.userService.findOneByEmail(payload.email);
  // }
}
