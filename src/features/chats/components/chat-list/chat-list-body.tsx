import style from "./chat-list-body.module.css";
import type { Chat } from "../../entities/chat.entity";
import defaultAvatar from "@assets/default-bounty-hunter.svg";

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

  return (
    <div className={style.bodyContainer}>
      {chats.map((chat) => {
        const isActive = activeChatId === chat.id;

        return (
          <div
            key={chat.id}
            className={`${style.chatCard} ${isActive ? style.activeCard : ""}`}
            onClick={() => onSelectChat && onSelectChat(chat.id)}
          >
            {/* Imagen del chat o imagen por defecto chat.image ||*/}
            <div className={style.avatarContainer}>
              <img
                src={defaultAvatar}
                alt={chat.name}
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