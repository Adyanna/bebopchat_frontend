import { useParams, Navigate } from "react-router";
import { ChatInfo } from "@features/chats/components/chat-info/chat-info";
import { useChat } from "@features/chats/hooks/useChat";
import { Messages } from "@features/chats/components/messages/messages";
import { ChatInput } from "@features/chats/components/chatInput/chat-input";
import { useMessages } from "@features/chats/hooks/useMessages";
import { useState, useEffect } from "react";
import { socket } from "@core/socket/socket";
import { updateMessageStatus } from "@features/chats/services/chat.service";
import type { StatusType } from "@features/chats/entities/chat.entity";
import { useOutletContext } from "react-router";

const messageSound = new Audio("/sounds/den_den_mushi.mp3");
const notiSound = new Audio("/sounds/notification.mp3");

type ChatPageContext = {
    refreshChatList: () => void;
};

function ChatWindow() {
    const { id } = useParams();
    const chatId = Number(id);
    const { chat, notification, loading, updateChatInfo, removeParticipant } = useChat(chatId);
    const { refreshChatList } = useOutletContext<ChatPageContext>();
    const { messages, isFetchingMore, fetchMore, hasMore, addMessage, removeMessage, editMessage, updateStatus, sendMessage, error } = useMessages(chatId, refreshChatList);

    // RECIBIR MENSAJES EN EL CHATWINDOW DEL RECEPTOR.
    // Si el receptor está conectado, actualiza el estado a RECIBE.
    // Si tiene abierto el chat donde llega el mensaje, lo muestra y actualiza su estado a VIEW.

    useEffect(() => {
        const handleReceiveMessage = async (
            message: (typeof messages)[number]
        ) => {
            //  Insertar estado RECIBE, ya que el usuario se encuentra conectado
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
                messageSound.play().then(() => {
                    setTimeout(() => {
                        messageSound.pause();
                        messageSound.currentTime = 0;
                    }, 2000);
                }).catch((error) => {
                    console.error("Error al reproducir el sonido:", error);
                });

                return;
            }

            addMessage(message);
            notiSound.play().catch((error) => {
                console.error("Error al reproducir el sonido:", error);
            });

            try {
                // Si estamos dentro de este chat, el mensaje está visto.
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