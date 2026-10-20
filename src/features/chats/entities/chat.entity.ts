// export interface Participant {
//     userId: number;
//     fullname: string;
//     role: string;
// }

// DTO para enviar en el POST /chats
export interface CreateChatDTO {
    name?: string;
    description?: string;
    participantIds: number[];
}

// Respuesta estructurada del Backend (GET /users/me/chats)
export interface GetChatsResponse {
    data: Chat[];
}

export type ChatType = "INDIVIDUAL" | "GROUP";
export type MessageType = "TEXT" | "AUDIO" | "VIDEO" | "IMAGE";
export type StatusType = "SEND" | "RECIBE" | "VIEW";

export type ChatParticipant = {
    userId: number;
    fullname: string;
    role: string;
    profilePicture: string | null
}


export interface LastMessage {
    id: number;
    content?: string;
    multimediaUrl: string | null;
    type: MessageType;
    senderId: number;
    chatId: number;
    createdAt: string;
}

export type Chat = {
    id: number,
    createAt: string;
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
    status: StatusType;
    multimediaUrl: string | null
    chatId: number;
    senderId: number
}

export type MessageResponse = {
    data: Message[]
    meta: {
        limit: number
    }
}

export interface TargetUser {
    id: number
    fullname: string,
    phone: string,
    profilePicture: string | null;
}