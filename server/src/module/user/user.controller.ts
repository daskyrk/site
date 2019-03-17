import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  public findAll() {
    return 'This action returns all cats';
  }

  @Get(':id')
  public findOne(@Param() params: any) {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Post()
  public create() {
    return 'This action adds a new cat';
  }
  @Put(':id')
  public update(@Param('id') id: string) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
