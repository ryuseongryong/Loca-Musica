import { Controller, Get, Post } from '@nestjs/common';

@Controller('oauth')
export class OauthController {
  @Get()
  getAll() {
    return 'This is Oauth';
  }

  @Post('kakao')
  kakaoAuth() {
    return 'kakao Auth!!';
  }
}
