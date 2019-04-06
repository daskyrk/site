import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { LoginDto, UserInfoDto } from './dto/user.dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public create(@Body() userInfoDto: UserInfoDto) {
    return this.userService.create(userInfoDto);
  }

  @Post('login')
  public login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
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
