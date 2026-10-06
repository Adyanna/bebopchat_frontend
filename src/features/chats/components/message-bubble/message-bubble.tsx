import { useUser } from "@features/users/hooks/useUser";
import { useState } from "react";
import "./message-bubble.css"

type Props = {
    id: number;
    senderId: number;
    content: string;
    onDelete: (messageId: number) => void;
}

export function MessageBuble({ id, senderId, content, onDelete }: Props) {
    const { userData } = useUser();
    const currentId = userData?.id;
    const [menuOpen, setMenuOpen] = useState(false);

    const currentUser =
        "flex w-fit max-w-[65%] flex-col self-end rounded-2xl rounded-br-md bg-[#A8C686] !px-6 py-3 text-left text-sm text-[#263238] shadow-sm";

    const otherUser =
        "flex w-fit max-w-[65%] flex-col self-start rounded-2xl rounded-bl-md bg-[#1F2833] !px-6 py-3 text-left text-sm text-[#C5C6C7] shadow-sm";

    const clasStyle = senderId === currentId ? currentUser : otherUser;
    const isCurrentUser = senderId === currentId;
    return (
        <div className={`${clasStyle} relative`}>
            {isCurrentUser && (
                <>
                    <button
                        type="button"
                        onClick={() => setMenuOpen(prev => !prev)}
                        className="message-options-button"
                        aria-label="Opciones del mensaje"
                    >
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
                                d="m6 9 6 6 6-6"
                            />
                        </svg>
                    </button>

                    {menuOpen && (
                        <div className="message-options-menu">
                            <button
                                type="button"
                                onClick={() => {
                                    setMenuOpen(false);
                                    onDelete(id);
                                }}
                                className="message-delete-button"
                            >
                                Eliminar
                            </button>
                        </div>
                    )}
                </>
            )}
            <div className="break-words">{content}</div>
            {/*Mejorar fecha traida del backend*/}
            <div className="mt-1 self-end whitespace-nowrap text-[11px] opacity-70">4:08 p.m.</div>
        </div>
    )
}  