import { useRef } from "react";
import { useMessages } from "@features/chats/hooks/useMessages";
import { MessageBuble } from "../message-bubble/message-bubble";

type Props = {
    chatId: number
}

export const Messages = ({ chatId }: Props) => {
    const { messages, isFetchingMore, fetchMore, hasMore } = useMessages(chatId);

    const containerRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        const element = containerRef.current;
        if (!element) return;
        if (element.scrollTop < 100 && !isFetchingMore && hasMore) {
            fetchMore();
        }
    }

    return (
        <div ref={containerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto flex flex-col">
            {isFetchingMore &&
                <span className="text-center p-2">Cargando...</span>}
            {messages.map((message) => (
                <MessageBuble
                    key={message.id} senderId={message.senderId} content={message.content}
                />))}
        </div>

    )

}