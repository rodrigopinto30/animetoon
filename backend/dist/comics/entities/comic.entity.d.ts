import { User } from '../../users/entities/user.entity';
export declare class Comic {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    genre: string;
    createdAt: Date;
    author: User;
}
