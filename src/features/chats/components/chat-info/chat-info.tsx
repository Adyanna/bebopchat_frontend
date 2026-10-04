import type { ChatParticipant, ChatType } from "@features/chats/types/chat-types";


type Props = {
    type: ChatType;
    participants: ChatParticipant[];
    name: string | null;
}


export const ChatInfo = ({ type, participants, name }: Props) => {
    const currentUserId = 2

    const otherParticipant = participants.find(
        participant => participant.userId !== currentUserId
    );
    const displayName = type === "GROUP" ? name ?? "Grupo" : otherParticipant?.fullname ?? "Usuario";

    return (
        <div>
            <p>{displayName}</p>
        </div>
    )

}