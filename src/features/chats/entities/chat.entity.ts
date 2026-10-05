export interface Participant {
  userId: number;
  fullname: string;
  role: string;
}

export interface Chat {
  id: number;
  createAt: string;
  name: string;
  description: string;
  type: string;
  participants: Participant[];
}

// DTO para enviar en el POST /chats
export interface CreateChatDTO {
  name: string;
  description: string;
  participantIds: number[];
}

// Respuesta estructurada del Backend (GET /users/me/chats)
export interface GetChatsResponse {
  data: Chat[];
}