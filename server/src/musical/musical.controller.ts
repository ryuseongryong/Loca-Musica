import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { get } from 'http';

@Controller('musical')
export class MusicalController {
  // query가 param 검색보다 가장 위에 있어야 한다?
  // https://nomadcoders.co/nestjs-fundamentals/lectures/1946
  // loca-musica.com/musical?title=wikid
  @Get('main')
  getAll() {
    return 'This is musical everything';
  }

  @Get()
  searchTitle(@Query('title') title: string) {
    return `This is search result: ${title}`;
  }

  @Get(':title')
  getTitle(@Param('title') title: string) {
    return `This is Musical ${title}`;
  }

  @Post('bookmark')
  bookMark(@Body() title: string) {
    return title;
  }
}
