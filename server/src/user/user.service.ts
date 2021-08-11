import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { FindConditions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  signup(userData: UserData) {
    return this.usersRepository.insert(userData);
  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findOne(userData: UserData): Promise<Users> {
    const { email, username, password } = userData;
    return this.usersRepository.findOne({
      email,
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
