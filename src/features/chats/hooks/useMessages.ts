import { getMessages } from "../services/chat.service";
import type { Message } from "../entities/chat.entity";
import { useEffect, useState } from "react";


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

    return {
        messages,
        fetchMore,
        isFetchingMore,
        hasMore,
        addMessage
    }
}