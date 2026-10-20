import style from "./chat-list-body.module.css";
import type { Chat } from "../../entities/chat.entity";
import defaultAvatar from "@assets/default-bounty-hunter.svg";
import { useUser } from "@features/users/hooks/useUser";
import { API_URL } from "@features/chats/services/chat-list.service";

interface ChatListBodyProps {
  chats: Chat[];
  loading?: boolean;
  onSelectChat?: (id: number) => void;
  activeChatId?: number;
}

export const ChatListBody = ({
  chats,
  loading,
  onSelectChat,
  activeChatId,
}: ChatListBodyProps) => {
  if (loading) {
    return <div className={style.statusMessage}>CARGANDO CHATS...</div>;
  }

  if (!chats || chats.length === 0) {
    return <div className={style.statusMessage}>NO HAY CHATS DISPONIBLES</div>;
  }

  const { userData } = useUser();
  const currentUserId = userData?.id;

  return (
    <div className={style.bodyContainer}>
      {chats.map((chat) => {

        const isActive = activeChatId === chat.id;
        const participantPhoto = chat.participants.find(participant => participant.userId !== currentUserId)?.profilePicture;
        const chatPhoto = chat.type === 'INDIVIDUAL' && participantPhoto ? `${API_URL}${participantPhoto}` : defaultAvatar;

        return (
          <div
            key={chat.id}
            className={`${style.chatCard} ${isActive ? style.activeCard : ""}`}
            onClick={() => onSelectChat && onSelectChat(chat.id)}
          >
            {/* Imagen del chat o imagen por defecto chat.image ||*/}
            <div className={style.avatarContainer}>
              <img
                src={chatPhoto}
                alt={chat.name || 'foto del chat'}
                className={style.avatarImage}
              />
            </div>

            {/* Nombre del chat */}
            <div className={style.chatInfo}>
              <span className={style.chatName}>{chat.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};