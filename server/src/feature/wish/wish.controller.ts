import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QueryWishDto, WishDto } from './dto/wish.dto';

import { AuthGuard } from '@/core/guards';
import { WishService } from './wish.service';

@Controller('wish')
export class WishController {
  constructor(private readonly service: WishService) { }

  @Post()
  public create(@Body() wishDto: WishDto) {
    return this.service.create(wishDto);
  }

  @Get()
  public search(@Query() query: QueryWishDto, @Req() req: any) {
    // 未登录只查询公开的和审核过的
    if (!req.user) {
      query.public = true;
      query.show = true;
    }
    return this.service.search(query);
  }

  @Put()
  @UseGuards(AuthGuard)
  public update(@Body() wishDto: WishDto) {
    return this.service.update(wishDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  public remove(@Query('id') id: string) {
    return this.service.delete(id);
  }

  @Patch('reply')
  @UseGuards(AuthGuard)
  public reply(@Body('id') id: string, @Body('reply') reply: string) {
    return this.service.reply(id, reply);
  }
}
