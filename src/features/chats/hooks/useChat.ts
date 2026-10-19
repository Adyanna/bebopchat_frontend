import { useState, useEffect } from "react";
import { getChat, updateChat, removeChatParticipant, addParticipantsService } from "../services/chat.service";
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

    const updateChatInfo = async (name: string, description: string,): Promise<void> => {
        const updatedChat = await updateChat(chatId, {
            name,
            description,
        });

        setChat((currentChat) =>
            currentChat
                ? {
                    ...currentChat,
                    name: updatedChat.name,
                    description: updatedChat.description,
                }
                : currentChat,
        );
    };

    const removeParticipant = async (userId: number): Promise<void> => {
        await removeChatParticipant(chatId, userId);

        setChat((currentChat) =>
            currentChat
                ? {
                    ...currentChat,
                    participants: currentChat.participants.filter(
                        (participant) => participant.userId !== userId,
                    ),
                }
                : currentChat,
        );
    };

    const addParticipants = async (chatId: number, participantIds: number[]): Promise<void> => {
        const updatedChat = await addParticipantsService(chatId, participantIds);

        setChat((currentChat) =>
            currentChat
                ? {
                    ...currentChat,
                    participants: updatedChat.participants,
                }
                : currentChat,
        );
    }

    return {
        chat,
        notification,
        loading,
        updateChatInfo,
        removeParticipant,
        addParticipants
    };


};