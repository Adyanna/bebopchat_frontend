import { useParams } from "react-router";
import { ChatInfo } from "@features/chats/components/chat-info/chat-info";
import { useChat } from "@features/chats/hooks/useChat";
import { Navigate } from "react-router";
import { Messages } from "@features/chats/components/messages/messages";
import { ChatInput } from "@features/chats/components/chatInput/chat-input";
import { createMessage } from "@features/chats/services/chat.service";
import { useMessages } from "@features/chats/hooks/useMessages";

function ChatWindow() {
    const { id } = useParams();
    const chatId = Number(id);
    const { chat, notification, loading, } = useChat(chatId);
    const { messages, isFetchingMore, fetchMore, hasMore, addMessage } = useMessages(chatId);

    if (loading) return <p>Cargando...</p>;
    if (notification) return <p>{notification}</p>;

    if (!chat) {
        return <Navigate to="/not-found" replace />;
    }

    const sendMessage = async (content: string) => {
        try {
            const response = await createMessage(chatId, content);

            addMessage(response);
        } catch (error) {
            console.error("Error al enviar mensaje:", error);
        }
    };


    return (
        <div className="flex h-135 min-h-0 flex-col border border-cyan-400/30 bg-[#0B0C10]">
            {<ChatInfo type={chat.type} participants={chat.participants} name={chat.name} />}
            {<Messages messages={messages} isFetchingMore={isFetchingMore}
                fetchMore={fetchMore} hasMore={hasMore} />}
            {<ChatInput onSend={sendMessage} />}
        </div>
    )
}

export default ChatWindow;