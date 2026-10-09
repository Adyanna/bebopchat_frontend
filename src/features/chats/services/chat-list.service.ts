import type { Chat, CreateChatDTO, GetChatsResponse, TargetUser } from '../entities/chat.entity';

const API_URL = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const chatService = {
  // GET /users/me/chats
  async getMyChats(): Promise<GetChatsResponse> {
    const response = await fetch(`${API_URL}/users/me/chats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener la lista de chats');
    }
    // console.log(response.json())
    return await response.json();
  },

  // POST /chats
  async createChat(data: CreateChatDTO): Promise<Chat> {
    const response = await fetch(`${API_URL}/chats`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al crear el chat');
    }

    return response.json();
  },

  async searchUser(phone: string): Promise<TargetUser> {
    const response = await fetch(`${API_URL}/users?phone=${encodeURIComponent(phone)}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Unable to get user');
    }

    return response.json();
  }
}