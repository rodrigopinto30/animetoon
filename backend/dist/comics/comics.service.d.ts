import { Repository } from 'typeorm';
import { Comic } from './entities/comic.entity';
import { Episode } from './entities/episode.entity';
export declare class ComicsService {
    private readonly comicRepository;
    private readonly episodeRepository;
    constructor(comicRepository: Repository<Comic>, episodeRepository: Repository<Episode>);
    create(createComicDto: any, user: any): Promise<Comic[]>;
    createEpisode(comicId: string, episodeData: any): Promise<Episode[]>;
    findAll(): Promise<Comic[]>;
    findOne(id: string): Promise<Comic>;
    findEpisodeById(id: string): Promise<Episode | null>;
}
