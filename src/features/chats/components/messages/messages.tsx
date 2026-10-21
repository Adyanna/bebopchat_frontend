import { useRef, useEffect } from "react";
import { MessageBuble } from "../message-bubble/message-bubble";
import type { Message } from "@features/chats/entities/chat.entity";
// import "./message.css"
import styles from "./message.module.css";

type Props = {
    messages: Message[];
    fetchMore: () => void;
    isFetchingMore: boolean;
    hasMore: boolean;
    messageError: string | null;
    removeMessage: (messageId: number) => void;
    editMessage: (messageId: number, newContent: string) => Promise<void>;
}

export const Messages = ({
    messages,
    fetchMore,
    isFetchingMore,
    hasMore,
    messageError,
    removeMessage,
    editMessage
}: Props) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const isInitialLoad = useRef(true);

    useEffect(() => {
        const element = containerRef.current;
        if (!element || messages.length === 0) return;

        const scrollToBottom = () => {
            element.scrollTop = element.scrollHeight;
        };

        scrollToBottom();

        const images = element.querySelectorAll("img");

        images.forEach((image) => {
            if (!image.complete) {
                image.addEventListener("load", scrollToBottom, { once: true });
            }
        });

        return () => {
            images.forEach((image) => {
                image.removeEventListener("load", scrollToBottom);
            });
        };
    }, [messages]);


    const handleScroll = () => {
        const element = containerRef.current;
        if (!element) return;
        if (element.scrollTop < 100 && !isFetchingMore && hasMore) {
            fetchMore();
        }
    }

    return (
        <div ref={containerRef} onScroll={handleScroll} className={styles.messagesContainer}>
            {isFetchingMore &&
                <span className="text-center p-2">Cargando...</span>}
            {messages.map((message) => (
                <MessageBuble
                    id={message.id}
                    key={message.id}
                    senderId={message.senderId}
                    content={message.content}
                    status={message.status}
                    type={message.type}
                    multimediaUrl={message.multimediaUrl}
                    createAt={message.createAt}
                    updatedAt={message.updatedAt}
                    chatType={message.chatType}
                    user={message.user}
                    onDelete={removeMessage}
                    onEdit={editMessage}
                />))}
            {messageError && <div className={styles.messageError}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 18h14M6 18v-3a6 6 0 0 1 12 0v3M9 18V15a3 3 0 0 1 6 0v3"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2M4.93 5.93l1.41 1.41M19.07 5.93l-1.41 1.41M3 11h2M19 11h2"
                    />
                </svg>
                <span>{messageError}</span>
            </div>}
        </div>

    )

}