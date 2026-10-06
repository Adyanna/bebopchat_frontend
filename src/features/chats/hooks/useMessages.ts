import type { Message } from "../entities/chat.entity";
import { useEffect, useState } from "react";
import { getMessages, updateMessage, deleteMessage } from "../services/chat.service";


export function useMessages(chatId: number) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const loadInitial = async () => {
            setMessages([])
            setHasMore(true);
            const initial = await getMessages(chatId);
            setMessages(initial.data);
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

    return {
        messages,
        fetchMore,
        isFetchingMore,
        hasMore,
        addMessage,
        removeMessage,
        editMessage
    }
}