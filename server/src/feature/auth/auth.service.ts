import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) // userService中也要加
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async createToken() {
    const user: JwtPayload = { email: 'user@email.com' };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  public async validateUser(payload: JwtPayload): Promise<any> {
    console.log('payload:', payload);
    return await this.userService.findOne({ email: payload.email });
  }
}
