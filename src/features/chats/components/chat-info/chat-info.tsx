import type { ChatParticipant, ChatType } from "@features/chats/entities/chat.entity";
import { useUser } from "@features/users/hooks/useUser";
import { useState } from "react";
import { GroupInfoPanel } from "../group-info-panel/group-info-panel";
import { AddParticipantsButton } from "../add-participants-button/add-participants-button";
import { AddParticipantsModal } from "../add-participants-modal/add-participants-modal";
import defaultAvatar from "@assets/default-bounty-hunter.svg";
import { useCall } from "@features/chats/contexts/call-context";
import { API_URL } from "@features/chats/services/chat-list.service";
import "./chat-info.css"


type Props = {
    chatId: number,
    type: ChatType;
    participants: ChatParticipant[];
    name: string | null;
    description: string | null;
    onSave: (name: string, description: string) => Promise<void>;
    onRemoveParticipant: (userId: number) => Promise<void>;
    onAddParticipants: (chatId: number, participantIds: number[]) => Promise<void>
}


export const ChatInfo = ({ chatId, type, participants, name, description, onSave, onRemoveParticipant, onAddParticipants }: Props) => {
    const { userData } = useUser();
    const { startCall } = useCall();
    //REVISAR POR QUE CONSUME 8 VECES EL SERVICIO
    const currentUserId = userData?.id;


    const [isGroupInfoOpen, setIsGroupInfoOpen] = useState(false);
    const [isAddParticipantsOpen, setIsAddParticipantsOpen] = useState(false);

    const otherParticipant = participants.find(
        participant => participant.userId !== currentUserId
    );

    const participantPhoto = participants.find(participant => participant.userId !== currentUserId)?.profilePicture;
    const chatPhoto = type === 'INDIVIDUAL' && participantPhoto ? `${API_URL}${participantPhoto}` : defaultAvatar;


    const isAdmin = participants.some((participant) => participant.userId === currentUserId && participant.role === "ADMIN");
    const displayName = type === "GROUP" ? name ?? "Grupo" : otherParticipant?.fullname ?? "Usuario";

    return (
        <div className="chat-info-wrapper">
            <div className="chat-info">
                <div className="avatarWrapper">
                    <div className="avatarFrame">
                        <img
                            src={chatPhoto}
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
                {type === 'INDIVIDUAL' && otherParticipant && (
                    <button type="button" onClick={() => { void startCall(chatId, otherParticipant.userId) }} className="chat-call-button" aria-label="Iniciar llamada de audio" title="audio">
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
                )}
            </div>

            {type === "GROUP" && (
                <>
                    <div className="group-actions">
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

                        {isAdmin && (<AddParticipantsButton onClick={() => setIsAddParticipantsOpen(true)} />)}
                    </div>

                    {isAddParticipantsOpen && (
                        <AddParticipantsModal
                            chatId={chatId}
                            participants={participants}
                            onClose={() => setIsAddParticipantsOpen(false)}
                            onParticipantsAdded={onAddParticipants} />
                    )}



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