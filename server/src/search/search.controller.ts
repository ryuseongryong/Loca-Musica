import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('search')
export class SearchController {
  // undefined으로 오는 값 처리하기
  @Get()
  searchByMultipleHashtags(
    @Query('hashtag1') hashtag1: string,
    @Query('hashtag2') hashtag2: string,
    @Query('hashtag3') hashtag3: string,
  ) {
    return `this is result by ${hashtag1}&${hashtag2}&${hashtag3}`;
  }

  @Get(':hashtag')
  searchBySingleHashtag(@Param('hashtag') hashtag: string) {
    return `this is result by ${hashtag}`;
  }
}
