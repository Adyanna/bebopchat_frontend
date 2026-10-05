import { useRef, useEffect } from "react";
import { MessageBuble } from "../message-bubble/message-bubble";
import type { Message } from "@features/chats/types/chat-types";
import "./message.css"


type Props = {
    messages: Message[];
    fetchMore: () => void;
    isFetchingMore: boolean;
    hasMore: boolean;
}

export const Messages = ({ messages, fetchMore, isFetchingMore, hasMore }: Props) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const isInitialLoad = useRef(true);

    useEffect(() => {
        const element = containerRef.current;

        if (!element || messages.length === 0) return;

        if (isInitialLoad.current) {
            element.scrollTop = element.scrollHeight;
            isInitialLoad.current = false;
        }
    }, [messages]);

    const handleScroll = () => {
        const element = containerRef.current;
        if (!element) return;
        if (element.scrollTop < 100 && !isFetchingMore && hasMore) {
            fetchMore();
        }
    }

    return (
        <div ref={containerRef} onScroll={handleScroll} className="messages-container flex-1 overflow-y-auto flex flex-col gap-2 !px-4">
            {isFetchingMore &&
                <span className="text-center p-2">Cargando...</span>}
            {messages.map((message) => (
                <MessageBuble
                    key={message.id} senderId={message.senderId} content={message.content}
                />))}
        </div>

    )

}