import { Outlet } from "react-router";
import { useState } from "react";
import { ChatList } from "../chat-list/chat-list"; // Ajusta la ruta a tu ChatList
import style from "./chat-page.module.css";

function ChatPage() {
    const [refreshChats, setRefreshChats] = useState(0);
    return (
        <div className={style.chatPage}>
            {/* Panel izquierdo: Lista de chats */}
            <aside className={style.sidebar}>
                <ChatList refreshChats={refreshChats} />
            </aside>

            {/* Panel derecho: Subrutas (ChatEmpty o ChatWindow) */}
            <main className={style.content}>
                <Outlet context={{ refreshChatList: () => setRefreshChats((prev) => prev + 1) }} />
            </main>
        </div>
    );
}

export default ChatPage;