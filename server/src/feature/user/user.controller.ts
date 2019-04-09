import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDto, UserInfoDto } from './dto/user.dto';

import { AuthGuard } from '@/core/guards';
import { ForbiddenError } from 'apollo-server-core';
import { UserService } from './user.service';
import config from '@/config';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public create(@Body() userInfoDto: UserInfoDto) {
    return this.userService.createUser(userInfoDto);
  }

  @Post('login')
  public async login(@Body() loginDto: LoginDto, @Res() res: any) {
    const { user, token } = await this.userService.login(loginDto);
    return res
      .cookie('token', token, { httpOnly: true, maxAge: config.TOKEN_TIME })
      .status(HttpStatus.OK)
      .json({
        data: { user, token },
        success: true,
      });
  }

  @Get('info')
  @UseGuards(AuthGuard)
  public getInfo(@Req() req: any) {
    const { email } = req.user;
    return this.userService.findOne({ email });
  }

  @Get()
  @UseGuards(AuthGuard)
  public search(@Query('q') q: string) {
    return this.userService.search(q);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put()
  @UseGuards(AuthGuard)
  public update(@Body() userInfoDto: UserInfoDto) {
    return this.userService.update(userInfoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  public remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
