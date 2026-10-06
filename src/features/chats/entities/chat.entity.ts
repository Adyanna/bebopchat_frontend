export interface Participant {
    userId: number;
    fullname: string;
    role: string;
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

export type ChatType = "INDIVIDUAL" | "GROUP";
export type MessageType = "TEXT" | "AUDIO" | "VIDEO" | "IMAGE";

export type ChatParticipant = {
    userId: number;
    fullname: string;
    role: string;
}


export interface LastMessage {
    id: number;
    content: string;
    multimediaUrl: string | null;
    type: MessageType;
    senderId: number;
    chatId: number;
    createdAt: Date;
}

export type Chat = {
    id: number,
    createdAt: Date;
    name: string | null;
    description: string | null;
    type: ChatType;
    participants: ChatParticipant[];
    lastMessage: LastMessage | null;
}
// export interface Chat {
//   id: number;
//   createAt: string;
//   name: string;
//   description: string;
//   type: string;
//   participants: Participant[];
// }

export type Message = {
    id: number;
    createAt: string;
    updatedAt: string;
    content: string;
    type: MessageType;
    chatId: number;
    senderId: number
}

export type MessageResponse = {
    data: Message[]
    meta: {
        limit: number
    }
}