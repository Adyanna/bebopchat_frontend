import { useUser } from "@features/users/hooks/useUser";
import { useState, useEffect } from "react";
import type { StatusType } from "@features/chats/entities/chat.entity";
import { MessageMedia } from "../message-media/message-media";
import type { ParticipantData } from "@features/chats/entities/chat.entity";
import defaultPerfil from "@assets/perfil.jpeg";
import "./message-bubble.css";
//import styles from "./message-bubble.module.css";


type Props = {
    id: number;
    senderId: number;
    content: string;
    status: StatusType;
    type: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO";
    multimediaUrl: string | null;
    createAt: string;
    updatedAt: string;
    chatType?: "GROUP" | "INDIVIDUAL";
    user?: ParticipantData;
    onDelete: (messageId: number) => void;
    onEdit: (messageId: number, newContent: string) => Promise<void>;
}
const url = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`;

export function MessageBuble({
    id,
    senderId,
    content,
    status,
    type,
    multimediaUrl,
    createAt,
    updatedAt,
    chatType,
    user,
    onDelete,
    onEdit
}: Props) {
    const { userData } = useUser();
    const currentId = userData?.id;
    const [menuOpen, setMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const currentUser =
        "flex w-fit max-w-[75%] flex-col self-end rounded-2xl rounded-br-md bg-[#A8C686] !px-6 py-3 text-left text-sm text-[#263238] shadow-sm";

    const otherUser =
        "flex w-fit max-w-[75%] flex-col self-start rounded-2xl rounded-bl-md bg-[#1F2833] !px-6 py-3 text-left text-sm text-[#C5C6C7] shadow-sm";

    const clasStyle = senderId === currentId ? currentUser : otherUser;
    //const clasStyle = senderId === currentId ? styles.currentUser : styles.otherUser;
    const isCurrentUser = senderId === currentId;
    const handleEdit = async () => {
        if (!editedContent.trim()) return;

        await onEdit(id, editedContent);
        setIsEditing(false);
    };

    const isEdited = updatedAt !== createAt;

    useEffect(() => {
        if (!menuOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMenuOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [menuOpen]);

    const messageTime = new Date(createAt).toLocaleTimeString("es-MX", {
        hour: "numeric",
        minute: "2-digit",
    });


    return (
        <div className={`flex w-full flex-col ${isCurrentUser ? "self-end" : "self-start"}`}>
            {chatType === "GROUP" && !isCurrentUser && (
                <div className="mb-1 flex items-center gap-2">
                    <img
                        src={url && user?.photoUrl ? url + user.photoUrl : defaultPerfil}
                        alt={user?.fullname || "Perfil"}
                        className="h-[31px] w-[31px] shrink-0 rounded-full object-cover"
                    />

                    <span className="text-xs font-semibold text-white-500">
                        {user?.fullname}
                    </span>
                </div>
            )}
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
                                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                            </svg>
                        </button>

                        {menuOpen && (
                            <div className="message-options-menu">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setIsEditing(true);
                                    }}
                                    className="message-buttons"
                                >
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        onDelete(id);
                                    }}
                                    className="message-buttons"
                                >
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </>
                )}
                {isEditing ? (
                    <div className="message-edit-container">
                        <input
                            className="message-edit-input"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleEdit();
                                }
                            }}
                        />

                        <button
                            type="button"
                            onClick={handleEdit}
                            className="message-save-button"
                        >
                            Guardar
                        </button>
                    </div>
                ) :
                    (
                        <div className="flex flex-col gap-2">
                            {multimediaUrl && (type === "IMAGE" || type === "VIDEO" || type === "AUDIO") && (
                                <MessageMedia url={multimediaUrl} type={type} />
                            )}

                            {multimediaUrl && content && (
                                <div className="message-media-divider" />
                            )}

                            {content && (
                                <div className="break-words">{content}</div>
                            )}
                        </div>
                    )
                }

                <div className="mt-1 self-end whitespace-nowrap text-[11px] opacity-70">
                    {isEdited && <span>Editado · </span>}
                    {messageTime}
                    {isCurrentUser && (
                        <span
                            className={`inline-block text-base font-black leading-none ${status === "VIEW" ? "text-blue-500" : "text-gray-500"
                                }`}
                            style={{ WebkitTextStroke: "0.5px currentColor" }}
                            title={status}
                            aria-label={`Estado: ${status}`}
                        >
                            {status === "SEND" ? "✓" : "✓✓"}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}  