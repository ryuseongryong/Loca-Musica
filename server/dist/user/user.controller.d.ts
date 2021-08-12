import { UserService } from './user.service';
import { UserDataDto } from '../dtos/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(): string;
    getUserInfo(req: any): any;
    getAuth(): string;
    signin(userData: any): any;
    signup(userData: UserDataDto, req: any, res: any): Promise<void>;
    editpassword(password: any): any;
    editprofile(profileUrl: any): any;
    editusername(username: any): any;
    delete(password: any): any;
    findAll(): Promise<import("../entities/Users").Users[]>;
}
