
import type {
  CreateStatusDTO,
  StatusResponse,
  StatusesResponse,
} from '@features/status/entities/status.entity';

const API_URL = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const statusService = {
  // GET /status/my
  async getMyStatuses(): Promise<StatusesResponse> {
    const response = await fetch(`${API_URL}/status/my`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener mis estados');
    }

    return await response.json();
  },

  // GET /status/contacts
  async getContactStatuses(): Promise<StatusesResponse> {
    const response = await fetch(`${API_URL}/status/contacts`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener los estados de los contactos');
    }

    return await response.json();
  },

  // POST /status
  async createStatus(data: CreateStatusDTO): Promise<StatusResponse> {
    const response = await fetch(`${API_URL}/status`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error ?? JSON.stringify(errorData));
    }

    return await response.json();
  },

  // DELETE /status/:estadoId
  async deleteStatus(estadoId: number): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/status/${estadoId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error ?? JSON.stringify(errorData));
    }

    return await response.json();
  },

  // POST /status/:estadoId/views
  async registerStatusView(estadoId: number): Promise<StatusResponse> {
    const response = await fetch(`${API_URL}/status/${estadoId}/views`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error ?? JSON.stringify(errorData));
    }

    return await response.json();
  },
};
