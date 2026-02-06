import { User } from '../../users/entities/user.entity';
import { Episode } from '../../comics/entities/episode.entity';
export declare class Comment {
    id: string;
    content: string;
    createdAt: Date;
    user: User;
    episode: Episode;
    parentComment?: Comment;
    replies: Comment[];
}
