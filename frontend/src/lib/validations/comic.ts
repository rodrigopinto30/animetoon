export interface Page {
  id: string;
  imageUrl: string;
  order: number;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  description: string | null;
  isFree: boolean;
  price: number;
  pages: Page[];
  createdAt: string;
  thumbnailUrl?: string;   
  prevEpisodeId: string | null;
  nextEpisodeId: string | null;
}
export interface Comic {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  author?: string;
  status?: 'ONGOING' | 'COMPLETED';
  genre?: string;
  isFavorite?: boolean;
  episodes: [];
}
export interface PaginatedComics {
  items: Comic[];
  total: number;
  page: number;
  lastPage: number;
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
// export interface ComicDetail extends Comic { 
//   episodes: Episode[];
// }