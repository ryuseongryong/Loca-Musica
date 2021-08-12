import { UserDataDto } from '../dtos/user.dto';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<Users>);
    signup(userData: UserDataDto): Promise<import("typeorm").InsertResult>;
    create(userData: UserDataDto): Promise<import("typeorm").InsertResult>;
    findAll(): Promise<Users[]>;
    findOne(email: string): Promise<any>;
    findAuth(email: string): Promise<Users | undefined>;
    remove(id: string): Promise<void>;
    getUserInfo(): string;
    getAuth(): string;
}
