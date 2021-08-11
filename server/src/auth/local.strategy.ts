import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDataDto } from '../dtos/user.dto';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userData: UserDataDto): Promise<any> {
    // const { email, password } = userData;
    const user = await this.authService.validateUser(userData);
    console.log('user: ', user);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
