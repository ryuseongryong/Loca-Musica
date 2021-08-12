import { Injectable } from '@nestjs/common';
import { UserDataDto } from '../dtos/user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);

    // console.log('userData: ', email, password);
    // console.log('AuthService user: ', user);
    if (user && user.password === password) {
      // password를 제외하고 result만 리턴
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email) {
    const payload = { email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
