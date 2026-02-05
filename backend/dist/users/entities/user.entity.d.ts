import { Role } from '../../auth/enums/roles.enum';
export declare class User {
    id: string;
    email: string;
    password: string;
    username: string;
    role: Role;
    coins: number;
    createdAt: Date;
}
