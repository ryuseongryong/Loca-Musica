import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    // const { email, password } = userData;

    const user = await this.userService.findAuth(email);
    console.log('user: ', user);
    if (user && user.password === password) {
      // password를 제외하고 result만 리턴
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
