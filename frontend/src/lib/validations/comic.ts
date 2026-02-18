export interface Episode {
  id: string;
  number: number;
  title: string;
  releaseDate: string;
  thumbnailUrl?: string;
}

export interface Comic {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  author?: string;
  status?: 'ONGOING' | 'COMPLETED';
  genre?: string[];
  isFavorite?: boolean;
}

export interface EpisodePage {
  id: string;
  imageUrl: string;
  order: number;
}
export interface EpisodeDetail {
  id: string;
  number: number;
  title: string;
  releaseDate: string;
  pages: EpisodePage[];
  nextEpisodeId?: string | null;
  prevEpisodeId?: string | null;
}
export interface ComicDetail extends Comic { 
  episodes: Episode[];
}