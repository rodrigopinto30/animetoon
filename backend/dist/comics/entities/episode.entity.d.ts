import { Comic } from './comic.entity';
import { Comment } from '../../comments/entities/comment.entity';
export declare class Episode {
    id: string;
    title: string;
    number: number;
    isFree: boolean;
    price: number;
    comic: Comic;
    comments: Comment[];
    createdAt: Date;
}
