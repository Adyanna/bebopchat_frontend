import type { Message } from "../entities/chat.entity";
import { useEffect, useState } from "react";
// import { getMessages, updateMessage, deleteMessage } from "../services/chat.service";
import { getMessages, updateMessage, deleteMessage, createMessage } from "../services/chat.service";

import { updateMessageStatus } from "../services/chat.service";
import { uploadFile } from "@core/services/upload.service";
import { type FileType } from "@core/types/core-types";

export function useMessages(chatId: number, refreshChatList: () => void) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadInitial = async () => {
            setMessages([])
            setHasMore(true);
            const initial = await getMessages(chatId);
            setMessages(initial.data);
            for (const message of initial.data) {
                if (message.status !== "VIEW") {
                    try {
                        await updateMessageStatus(
                            chatId,
                            message.id,
                            "VIEW"
                        );
                    } catch (error) {
                        console.error(
                            "Error al actualizar el estado del mensaje:",
                            error
                        );
                    }
                }
            }
            if (initial.data.length < 30) {
                setHasMore(false)
            }
        }
        loadInitial();
    }, [chatId]);

    const fetchMore = async () => {
        if (isFetchingMore || !hasMore || messages.length === 0) return;
        const firstMessage = messages[0];
        setIsFetchingMore(true);
        const more = await getMessages(chatId, firstMessage.id);

        setMessages(prev => [...more.data, ...prev]);

        if (more.data.length < 30) {
            setHasMore(false);
        }
        setIsFetchingMore(false);
    }

    const addMessage = (message: Message) => {
        setMessages(prev => [...prev, message]);
    };

    const updateStatus = (
        messageId: number,
        status: Message["status"]
    ) => {
        setMessages(prev =>
            prev.map(message =>
                message.id === messageId
                    ? { ...message, status }
                    : message
            )
        );
    };

    const removeMessage = async (messageId: number) => {
        await deleteMessage(chatId, messageId);

        setMessages(prev =>
            prev.filter(message => message.id !== messageId)
        );
    };

    const editMessage = async (
        messageId: number,
        newContent: string
    ) => {
        const updatedMessage = await updateMessage(
            chatId,
            messageId,
            newContent
        );

        setMessages(prev =>
            prev.map(message =>
                message.id === messageId
                    ? updatedMessage
                    : message
            )
        );
    };

    const sendMessage = async (content: string, file?: File, tipo?: FileType) => {
        try {
            let multimediaUrl: string | undefined;

            if (file && tipo) {
                const uploadedUrl = await uploadFile(file, tipo);

                multimediaUrl = new URL(
                    uploadedUrl,
                    `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`,
                ).href;
            }

            const message = await createMessage(
                chatId,
                content,
                multimediaUrl,
            );
            setMessages(prev => [...prev, message]);
            refreshChatList();
            setError(null);
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Error al enviar el archivo";

            setError(errorMessage);
        }
    };

    return {
        messages,
        fetchMore,
        isFetchingMore,
        hasMore,
        addMessage,
        removeMessage,
        editMessage,
        updateStatus,
        sendMessage,
        error
    }
}