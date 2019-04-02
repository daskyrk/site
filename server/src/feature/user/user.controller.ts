import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserInfoDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public create(@Body() userInfoDto: UserInfoDto) {
    return this.userService.create(userInfoDto);
  }

  @Get()
  public search(@Param('key') key: string) {
    return this.userService.search(key);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Put()
  public update(@Body() userInfoDto: UserInfoDto) {
    return this.userService.update(userInfoDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }

}
