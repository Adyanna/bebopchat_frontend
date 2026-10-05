import type { ChatParticipant, ChatType } from "@features/chats/entities/chat.entity";
import { useUser } from "@features/users/hooks/useUser";
import "./chat-info.css"


type Props = {
    type: ChatType;
    participants: ChatParticipant[];
    name: string | null;
}


export const ChatInfo = ({ type, participants, name }: Props) => {
    const { userData } = useUser();
    console.log("USER CONTEXT:", userData);
    const currentUserId = userData?.id;
    const defaultAvatar = "../src/assets/default-bounty-hunter.svg";

    const otherParticipant = participants.find(
        participant => participant.userId !== currentUserId
    );
    const displayName = type === "GROUP" ? name ?? "Grupo" : otherParticipant?.fullname ?? "Usuario";

    return (
        <div className="chat-info">
            <div className="avatarWrapper">
                <div className="avatarFrame">
                    <img
                        src={defaultAvatar}
                        alt={`Foto de ${otherParticipant?.fullname}`}
                        className="avatarImage"
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <div className="text-lg font-semibold text-cyan-300">
                    {displayName}
                </div>
                <div className="badge">
                    {/*mejorar con sockets */}
                    ● En linea
                </div>
            </div>
            <button
                type="button"
                className="chat-call-button"
                aria-label="Llamar"
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
                        d="M5 4h3l2 5-2 2a13 13 0 0 0 5 5l2-2 5 2v3c0 1.1-.9 2-2 2C10.82 21 3 13.18 3 5c0-1.1.9-2 2-2Z"
                    />
                </svg>
            </button>

        </div >
    )

}