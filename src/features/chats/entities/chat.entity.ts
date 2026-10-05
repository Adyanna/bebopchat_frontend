
export type ChatType = "INDIVIDUAL" | "GROUP";

export type ChatParticipant = {
    userId: number;
    fullname: string;
    role: string;
}

export type MessageType = "TEXT" | "AUDIO" | "VIDEO" | "IMAGE";

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

export type Message = {
    id: number;
    createdAt: Date;
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