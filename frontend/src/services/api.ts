import { LoginValues } from "@/lib/validations/auth";

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

export const getComicById = async (id: string): Promise<Comic> => {
  const response = await fetch(`http://localhost:3001/comics/${id}`, {
    cache: 'no-store',
    headers: {
        'Accept': 'application/json',
      },
  });

  if (!response.ok) throw new Error('No se pudo encontrar el cómic');
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
    localStorage.setItem('token', data.access_token);
  }
  
  return data;
};