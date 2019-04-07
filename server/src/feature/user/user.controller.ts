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
  Res,
} from '@nestjs/common';
import { LoginDto, UserInfoDto } from './dto/user.dto';

import { UserService } from './user.service';
import config from '@/config';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public create(@Body() userInfoDto: UserInfoDto) {
    return this.userService.create(userInfoDto);
  }

  @Post('login')
  public async login(@Body() loginDto: LoginDto, @Res() res: any) {
    const { user, token } = await this.userService.login(loginDto);
    return res
      .cookie('token', token, { httpOnly: true, maxAge: config.TOKEN_TIME })
      .status(HttpStatus.OK)
      .json({
        data: user,
        success: true,
      });
  }

  @Get()
  public search(@Query('key') key: string) {
    return this.userService.search(key);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put()
  public update(@Body() userInfoDto: UserInfoDto) {
    return this.userService.update(userInfoDto._id, userInfoDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
