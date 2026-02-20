import { LoginValues } from "@/lib/validations/auth";
import Cookies from 'js-cookie';
import { getCookie } from "cookies-next";
import { PaginatedComics } from "@/lib/validations/comic";


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

export const getComicById = async (id: string) => {
  // 1. Detectar entorno
  const isServer = typeof window === 'undefined';
  
  let token;
  if (isServer) {
    const { cookies } = require('next/headers');
    const cookieStore = await cookies();
    token = cookieStore.get("token")?.value;
  } else {
    token = getCookie("token");
  }

  const baseUrl = isServer 
    ? "http://backend:3001" 
    : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001");

  try {
    const response = await fetch(`${baseUrl}/comics/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
      },
      cache: 'no-store'
    });

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    console.error("🚨 Error en getComicById:", error);
    return null;
  }
};

export const getEpisodeById = async (episodeId: string) => {
  const token = getCookie("token");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comics/episodes/${episodeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener el episodio");
  }

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

export const signup = async (userData: any) => {
  const isServer = typeof window === 'undefined';
  const baseUrl = isServer ? 'http://backend:3001' : 'http://localhost:3001';

  const response = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error en el registro');
  }

  return response.json();
};

export const toggleFavorite = async (comicId: string) => {
  const token = getCookie("token");
    const baseUrl = typeof window === 'undefined' ? 'http://backend:3001' : 'http://localhost:3001';

  const response = await fetch(`${baseUrl}/favorites/${comicId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ comicId }), 
  });

  const contentType = response.headers.get("content-type");
  let data = {};
  
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  }

  if (!response.ok) {
    throw data; 
  }

  return data;
};

export const getMyFavorites = async () => {
  const token = getCookie("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Error al obtener favoritos");
  return response.json();
};

export const getUserFavorites = async (token: string) => {
  const isServer = typeof window === 'undefined';
  const baseUrl = isServer ? 'http://backend:3001' : 'http://localhost:3001';

  const response = await fetch(`${baseUrl}/favorites`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store', 
  });
  
  if (!response.ok) return [];
  return response.json();
};

export async function createComic(comicData: any, token: string | undefined) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comicData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear el cómic");
  }

  return response.json();
}

export async function createEpisode(comicId: string, formData: FormData, token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comics/${comicId}/episodes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al subir el episodio");
  }

  return response.json();
}

export const deleteComic = async (id: string) => {
  const token = getCookie("token");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comics/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "No se pudo eliminar el cómic");
  }

  return response.json();
};

export const updateComic = async (id: string, data: any) => {
  const token = getCookie("token");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comics/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar el cómic");
  }

  return response.json();
};