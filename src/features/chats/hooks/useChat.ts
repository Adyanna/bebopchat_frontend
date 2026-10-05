import { useState, useEffect } from "react";
import { getChat } from "../services/chat.service";
import { type Chat } from "../entities/chat.entity";

export const useChat = (chatId: number) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadChat = async (): Promise<void> => {
            try {
                const chat = await getChat(chatId);
                setChat(chat);
            } catch (error) {
                const notification =
                    error instanceof Error
                        ? error.message
                        : "No fue posible cargar el chat";

                setNotification(notification);
            } finally {
                setLoading(false);
            }
        };

        loadChat();
    }, [chatId]);

    return {
        chat,
        notification,
        loading,
    };
};