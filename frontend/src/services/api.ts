import { LoginValues } from "@/lib/validations/auth";
import { ComicDetail, EpisodeDetail } from "@/lib/validations/comic";
import Cookies from 'js-cookie';

export interface Comic {
  id: string;
  title: string;
  genre: string;
  coverImage: string;
  description: string;
}

export interface PaginatedComics {
  items: Comic[];
  total: number;
  page: number;
  lastPage: number;
}

export const getComics = async (filters: { title?: string, genre?: string, page?: number }): Promise<PaginatedComics> => {
  const { title, genre, page = 1 } = filters;
  const params = new URLSearchParams({
    page: page.toString(),
    limit: '10',
    ...(title && { title }),
    ...(genre && { genre }),
  });

  const response = await fetch(`http://localhost:3001/comics?${params}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Detalle del error:", errorData);
    throw new Error(`Error ${response.status}: ${errorData.message}`);
  }
  
  return response.json();
};

export const getComicById = async (id: string, token?: string): Promise<ComicDetail> => {
  try {
    const headers: HeadersInit = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`http://backend:3001/comics/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`API ERROR ${response.status}`);
    }

    return response.json()
    
  } catch (error) {
    // console.error("GET COMIC ERROR:", error);
    throw error;
  }
};

export const getEpisodeById = async (episodeId: string, token?: string): Promise<EpisodeDetail> => {
  const isServer = typeof window === 'undefined';
  const baseUrl = isServer ? 'http://backend:3001' : 'http://backend:3001';

  const response = await fetch(`${baseUrl}/comics/episodes/${episodeId}`, {
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    cache: 'no-store',
  });

  if (!response.ok) throw new Error('No se pudo cargar el episodio');
  return response.json();
};

export const login = async (credentials: LoginValues) => {
  const response = await fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Credenciales inválidas');
  }

  const data = await response.json();
  
if (data.access_token) {
    Cookies.set('token', data.access_token, { 
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax' 
    });
    localStorage.setItem('token', data.access_token);
  }
  
  return data;
};

export const toggleFavorite = async (comicId: string, token: string) => {
  const baseUrl = typeof window === 'undefined' ? 'http://backend:3001' : 'http://localhost:3001';
  
  const response = await fetch(`${baseUrl}/favorites/${comicId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Error del servidor:', errorData); 
    throw new Error('No se pudo actualizar favoritos');}
  return response.json();
};