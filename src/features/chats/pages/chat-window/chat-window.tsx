import { useParams, Navigate } from "react-router";
import { ChatInfo } from "@features/chats/components/chat-info/chat-info";
import { useChat } from "@features/chats/hooks/useChat";
import { Messages } from "@features/chats/components/messages/messages";
import { ChatInput } from "@features/chats/components/chatInput/chat-input";
import { useMessages } from "@features/chats/hooks/useMessages";
import { useEffect } from "react";
import { socket } from "@core/socket/socket";
import { updateMessageStatus } from "@features/chats/services/chat.service";
import type { StatusType } from "@features/chats/entities/chat.entity";
import { useOutletContext } from "react-router";


type ChatPageContext = {
    refreshChatList: () => void;
};

function ChatWindow() {
    const { id } = useParams();
    const chatId = Number(id);
    // const { chat, notification, loading, } = useChat(chatId);
    const { chat, notification, loading, updateChatInfo, removeParticipant, addParticipants } = useChat(chatId);

    // const [error, setError] = useState<string | null>(null);
    const { refreshChatList } = useOutletContext<ChatPageContext>();
    const { messages, isFetchingMore, fetchMore, hasMore, addMessage, removeMessage, editMessage, updateStatus, sendMessage, error } = useMessages(chatId, refreshChatList);

    // RECIBIR MENSAJES EN EL CHATWINDOW DEL RECEPTOR.
    // Si el receptor está conectado, actualiza el estado a RECIBE.
    // Si tiene abierto el chat donde llega el mensaje, lo muestra y actualiza su estado a VIEW.

    useEffect(() => {
        const handleReceiveMessage = async (
            message: (typeof messages)[number]
        ) => {
            console.log("DATOS DEL MENSAJE, AQUI ACTUALIZA EL ESTADO", message);
            //  Insertar estado RECIBE, ya que el usuario se encuentra conectado
            console.log("CHAT ID MENSJAE: ", message.chatId, " - ACTUAL ACTIVO: ", chatId)
            //controlar si es individual o grupal
            // aqui pasa algo que actualiza a visto aun que no este en el chat conectado en grupal
            if (Number(message.chatId) !== chatId) {

                //VERIFICAR SI ES INDIVIDUAL, Y RECIEN ACTUALIZAR
                try {
                    await updateMessageStatus(
                        message.chatId,
                        message.id,
                        "RECIBE"
                    );
                } catch (error) {
                    console.error(
                        "Error al marcar el mensaje como recibido:",
                        error
                    );
                }
                return;
            }

            console.log("Mensaje recibido en ChatWindow:", message);
            addMessage(message);

            try {
                // Si estamos dentro de este chat, el mensaje está visto.
                console.log("ACTUALIZAR EL ESTADO", message);
                await updateMessageStatus(
                    chatId,
                    message.id,
                    "VIEW"
                );
            } catch (error) {
                console.error(
                    "Error al actualizar el estado del mensaje:",
                    error
                );
            }
        };


        socket.on("receive_message", handleReceiveMessage);

        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };
    }, [chatId, addMessage]);

    // ACTUALIZAR EL ESTADO DEL MENSAJE EN EL CHATWINDOW DEL EMISOR.
    // Escucha las actualizaciones enviadas por el backend y muestra
    // el estado guardado en la base de datos.
    // Solo actualiza el estado si el usuario tiene abierto el chat correspondiente.
    useEffect(() => {
        const handleMessageStatusUpdated = (data: {
            chatId: number;
            messageId: number;
            status: StatusType;
        }) => {
            console.log("ACTUALIZACION DE ESTADO :", data);
            if (Number(data.chatId) !== chatId) return;

            updateStatus(data.messageId, data.status);
        };

        socket.on("message_status_updated", handleMessageStatusUpdated);

        return () => {
            socket.off("message_status_updated", handleMessageStatusUpdated);
        };
    }, [chatId, updateStatus]);


    if (loading) return <p>Cargando...</p>;
    if (notification) return <p>{notification}</p>;

    if (!chat) {
        return <Navigate to="/not-found" replace />;
    }

    return (
        <div className="flex h-full min-h-0 flex-col border border-cyan-400/30 bg-[#0B0C10]">
            {
                <div className="shrink-0">
                    <ChatInfo
                        chatId={chatId}
                        type={chat.type}
                        participants={chat.participants}
                        name={chat.name}
                        description={chat.description}
                        onSave={updateChatInfo}
                        onRemoveParticipant={removeParticipant}
                        onAddParticipants={addParticipants}
                    />
                </div>
            }
            {<Messages
                messages={messages}
                isFetchingMore={isFetchingMore}
                fetchMore={fetchMore}
                hasMore={hasMore}
                messageError={error}
                removeMessage={removeMessage}
                editMessage={editMessage}
            />}
            {
                <div className="shrink-0">
                    <ChatInput onSend={sendMessage} />
                </div>
            }
        </div>
    )
}

export default ChatWindow;