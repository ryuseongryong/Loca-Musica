import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDataDto } from '../dtos/user.dto';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    // const { email, password } = userData;
    const user = await this.authService.validateUser(email, password);
    // console.log('LocalStrategy user: ', user);

    if (!user) {
      throw new UnauthorizedException('유저정보가 없습니다');
    }
    return user;
  }
}
