import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
        username: string;
        role: import("./enums/roles.enum").Role;
        coins: number;
        createdAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            role: import("./enums/roles.enum").Role;
            coins: number;
        };
    }>;
    getProfile(req: any): any;
}
