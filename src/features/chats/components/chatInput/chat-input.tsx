import React, { useState } from "react";
import "./chat-input.css";

type Props = {
    onSend: (content: string) => void;
}

export function ChatInput({ onSend }: Props) {
    const [message, setMessage] = useState("");

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!message.trim()) return;

        onSend(message.trim());

        setMessage("");

    }

    return (
        <form onSubmit={handleSubmit} className="chat-input">
            <button type="button" className="chat-action-button" aria-label="Más">
                +
            </button>

            <input value={message}
                onChange={(event) => setMessage(event.target.value)}
                type="text"
                className="message-input"
                placeholder="Escribe un mensaje..."
            />

            <button className="send-button" type="submit">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >

                    <path strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 2 11 13"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m22 2-7 20-4-9-9-4 20-7Z"
                    />
                </svg>
            </button>
            <button className="chat-action-button">
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
                        d="M4 7h3l2-2h6l2 2h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"
                    />
                    <circle cx="12" cy="13" r="3" />
                </svg>

            </button>
            <button className="chat-action-button">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <rect
                        x="9"
                        y="3"
                        width="6"
                        height="11"
                        rx="3"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"
                    />
                </svg>
            </button>

        </form>
    )
}