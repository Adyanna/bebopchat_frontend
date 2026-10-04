import type { ChatParticipant, ChatType } from "@features/chats/types/chat-types";


type Props = {
    type: ChatType;
    participants: ChatParticipant[];
    name: string | null;
}


export const ChatInfo = ({ type, participants, name }: Props) => {
    const currentUserId = 1

    const otherParticipant = participants.find(
        participant => participant.userId !== currentUserId
    );
    const displayName = type === "GROUP" ? name ?? "Grupo" : otherParticipant?.fullname ?? "Usuario";

    return (
        <div className="flex h-[70px] items-center justify-center border-b border-cyan-400/30">
            <div className="text-lg font-semibold text-cyan-300">
                {displayName}
            </div>
        </div >
    )

}