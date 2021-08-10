import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser() {
    return 'This is user';
  }

  @Get('info')
  getUserInfo() {
    return this.userService.getUserInfo();
  }

  @Get('auth')
  getAuth() {
    return this.userService.getAuth();
  }

  @Post('signin')
  signin(@Body() userData) {
    return userData;
  }

  @Post('signup')
  signup(@Body() userData) {
    return userData;
  }

  @Patch('editpassword')
  editpassword(@Body() password) {
    return password;
  }

  @Patch('editprofile')
  editprofile(@Body() profileUrl) {
    return profileUrl;
  }

  @Patch('editusername')
  editusername(@Body() username) {
    return username;
  }

  @Patch('delete')
  delete(@Body() password) {
    return password;
  }
}
