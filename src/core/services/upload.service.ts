
import type { FileType } from "@core/types/core-types";
const url = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/upload`;

const getHeaders = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token") || "";
    return {
        'Authorization': `Bearer ${token}`
    };
};

export const uploadFile = async (
  file: File,
  tipo: FileType,
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('tipo', tipo);

  const response = await fetch(url, {
    method: 'POST',
    headers:  getHeaders(), // O como manejes tu token
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Error al subir la imagen');
  }

  return result.data.url; // Retorna ej: '/uploads/photos/17281898-foto.jpg'
};