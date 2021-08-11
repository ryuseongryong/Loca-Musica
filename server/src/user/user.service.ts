import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDataDto } from '../dtos/user.dto';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  signup(userData: UserDataDto) {
    return this.usersRepository.insert(userData);
  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findOne(userData: UserDataDto): Promise<Users> {
    const { email, username, password } = userData;
    return this.usersRepository.findOne({
      email,
      password,
    });
  }

  async findAuth(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({ email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  getUserInfo() {
    return 'This is userInfo';
  }

  getAuth() {
    return 'AccessToken published!';
  }
}
