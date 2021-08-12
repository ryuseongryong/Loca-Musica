import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { json } from 'express';
import { get } from 'http';
import { UserService } from './user.service';
import { UserDataDto } from '../dtos/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser() {
    return 'This is user';
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  getUserInfo(@Req() req) {
    console.log('req: ', req);
    console.log('req.user: ', req.user);
    return req.user;
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
  async signup(
    @Body() userData: UserDataDto,
    @Req() req,
    @Res() res,
  ): Promise<void> {
    // 입력 받은 email이 기존에 등록된 회원의 email과 일치하면 res.status(409).send({message:''})

    const { email, username, password } = userData;

    const findUserData = await this.userService.findOne(email);

    // console.log('findUserData: ', findUserData);

    // entity가 불충분한 경우
    if (
      email === undefined ||
      username === undefined ||
      password === undefined
    ) {
      res.status(422).send({
        message: 'input empty',
      });
    } else if (findUserData) {
      res.status(409).send({
        message: 'email conflict',
      });
    } else if (findUserData === undefined) {
      // 회원가입 요청된 Data를 DB에 입력
      const createUserData = await this.userService.create(userData);

      // AccessToken도 발급해줘야함

      res.status(200).json({
        message: 'ok',
      });
    } else {
      res.status(500).send({
        message: 'internal server error',
      });
    }
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

  @Get('test')
  findAll() {
    return this.userService.findAll();
  }

  // @Get('/:id')
  // getOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }
}
