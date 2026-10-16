// import { useParams, Navigate } from "react-router";
// import { ChatInfo } from "@features/chats/components/chat-info/chat-info";
// import { useChat } from "@features/chats/hooks/useChat";
// import { Messages } from "@features/chats/components/messages/messages";
// import { ChatInput } from "@features/chats/components/chatInput/chat-input";
// import { useMessages } from "@features/chats/hooks/useMessages";


// type ChatPageContext = {
//     refreshChatList: () => void;
// };

// function ChatWindow() {
//     const { id } = useParams();
//     const chatId = Number(id);
//     const { chat, notification, loading, updateChatInfo, removeParticipant } = useChat(chatId);
//     const {
//         messages,
//         isFetchingMore,
//         fetchMore,
//         hasMore,
//         removeMessage,
//         editMessage,
//         sendMessage,
//         error
//     } = useMessages(chatId);


//     if (loading) return <p>Cargando...</p>;
//     if (notification) return <p>{notification}</p>;

//     if (!chat) {
//         return <Navigate to="/not-found" replace />;
//     }


//     return (
//         <div className="flex h-[calc(100vh-180px)] min-h-0 flex-col border border-cyan-400/30 bg-[#0B0C10]">
//             {<ChatInfo
//                 chatId={chatId}
//                 type={chat.type}
//                 participants={chat.participants}
//                 name={chat.name}
//                 description={chat.description}
//                 onSave={updateChatInfo}
//                 onRemoveParticipant={removeParticipant}
//             />}
//             {<Messages
//                 messages={messages}
//                 isFetchingMore={isFetchingMore}
//                 fetchMore={fetchMore}
//                 hasMore={hasMore}
//                 messageError={error}
//                 removeMessage={removeMessage}
//                 editMessage={editMessage}
//             />}
//             {
//                 <div className="shrink-0">
//                     <ChatInput onSend={sendMessage} />
//                 </div>
//             }
//         </div>
//     )
// }

// export default ChatWindow;