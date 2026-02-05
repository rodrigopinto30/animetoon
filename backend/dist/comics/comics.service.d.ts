import { Repository } from 'typeorm';
import { Comic } from './entities/comic.entity';
export declare class ComicsService {
    private readonly comicRepository;
    constructor(comicRepository: Repository<Comic>);
    create(createComicDto: any, user: any): Promise<Comic[]>;
}
