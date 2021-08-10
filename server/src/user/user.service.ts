import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserInfo() {
    return 'This is userInfo';
  }

  getAuth() {
    return 'AccessToken published!';
  }
}
