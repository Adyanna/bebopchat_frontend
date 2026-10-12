import type { ChatParticipant, ChatType } from "@features/chats/entities/chat.entity";
import { useUser } from "@features/users/hooks/useUser";
import { useState } from "react";
import { GroupInfoPanel } from "../group-info-panel/group-info-panel";
import "./chat-info.css"


type Props = {
    chatId: number,
    type: ChatType;
    participants: ChatParticipant[];
    name: string | null;
    description: string | null;
    onSave: (name: string, description: string) => Promise<void>;
    onRemoveParticipant: (userId: number) => Promise<void>;
}


export const ChatInfo = ({ type, participants, name, description, onSave, onRemoveParticipant }: Props) => {
    const { userData } = useUser();
    const currentUserId = userData?.id;
    const defaultAvatar = "../src/assets/default-bounty-hunter.svg";

    const [isGroupInfoOpen, setIsGroupInfoOpen] = useState(false);

    const otherParticipant = participants.find(
        participant => participant.userId !== currentUserId
    );
    const displayName = type === "GROUP" ? name ?? "Grupo" : otherParticipant?.fullname ?? "Usuario";

    return (
        <div className="chat-info-wrapper">
            <div className="chat-info">
                <div className="avatarWrapper">
                    <div className="avatarFrame">
                        <img
                            src={defaultAvatar}
                            alt={`Foto de ${displayName}`}
                            className="avatarImage"
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="text-lg font-semibold text-cyan-300">
                        {displayName}
                    </div>

                    <div className="badge">
                        ● En linea
                    </div>
                </div>

                <button type="button" className="chat-call-button" aria-label="Llamar">
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
                            d="M5 4h3l2 5-2 2a13 13 0 0 0 5 5l2-2 5 2v3c0 1.1-.9 2-2 2C10.82 21 3 13.18 3 5c0-1.1.9-2 2-2Z"
                        />
                    </svg>
                </button>
            </div>

            {type === "GROUP" && (
                <>
                    <button
                        type="button"
                        className={`group-info-tab ${isGroupInfoOpen ? "is-open" : ""
                            }`}
                        onClick={() => setIsGroupInfoOpen((open) => !open)}
                        aria-expanded={isGroupInfoOpen}
                        aria-label="Mostrar información del grupo"
                    >
                        <span>Info del grupo</span>

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m6 9 6 6 6-6"
                            />
                        </svg>
                    </button>

                    {isGroupInfoOpen && currentUserId != null && (
                        <GroupInfoPanel
                            name={name}
                            description={description}
                            participants={participants}
                            currentUserId={currentUserId}
                            onClose={() => setIsGroupInfoOpen(false)}
                            onSave={onSave}
                            onRemoveParticipant={onRemoveParticipant}
                        />
                    )}
                </>
            )}
        </div>
    )
}