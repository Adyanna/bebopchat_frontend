import type { Chat, MessageResponse, Message } from "@features/chats/entities/chat.entity";

const url = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/chats`;



export async function getChat(chatId: number): Promise<Chat | null> {
    const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

    const response = await fetch(`${url}/${chatId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }

        throw new Error(
            data.errors?.join("\n") ||
            data.message ||
            "Error al obtener chat"
        );

    }

    return data;
}

export async function getMessages(chatId: number, before?: number): Promise<MessageResponse> {
    const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");
    const query = before ? `?before=${before}&limit=30` : `?limit=30`;

    const response = await fetch(`${url}/${chatId}/messages${query}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.errors?.join("\n") ||
            data.message ||
            "Error al obtener mensajes"
        );
    }

    return data;
}

export async function createMessage(chatId: number, content: string): Promise<Message> {
    const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

    const response = await fetch(`${url}/${chatId}/messages`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.errors?.join("\n") ||
            data.message ||
            "Error al mandar mensaje"
        );
    }

    return data;
}