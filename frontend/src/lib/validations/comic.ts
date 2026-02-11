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
  imageUrl: string;
  author?: string;
  status?: 'ONGOING' | 'COMPLETED';
  genre?: string[];
}

export interface ComicDetail extends Comic { 
  episodes: Episode[];
}