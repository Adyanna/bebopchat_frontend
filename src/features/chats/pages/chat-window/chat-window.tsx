import { useParams } from "react-router";
import { ChatInfo } from "@features/chats/components/chat-info/chat-info";
import { useChat } from "@features/chats/hooks/useChat";
import { Navigate } from "react-router";
import { Messages } from "@features/chats/components/messages/messages";

function ChatWindow() {
    const { id } = useParams();
    const chatId = Number(id);
    const { chat, notification, loading } = useChat(chatId);

    if (loading) return <p>Cargando...</p>;
    if (notification) return <p>{notification}</p>;

    if (!chat) {
        return <Navigate to="/not-found" replace />;
    }


    return (
        <div>
            {<ChatInfo type={chat.type} participants={chat.participants} name={chat.name} />}
            {<Messages chatId={chatId} />}
            {/*<ChatInput />*/}
        </div>
    )
}

export default ChatWindow;