import { User } from '../../users/entities/user.entity';
import { Episode } from './episode.entity';
export declare class Comic {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    genre: string;
    createdAt: Date;
    author: User;
    episodes: Episode[];
}
