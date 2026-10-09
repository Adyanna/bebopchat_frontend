import { Outlet } from "react-router";
import { ChatList } from "../chat-list/chat-list"; // Ajusta la ruta a tu ChatList
import style from "./chat-page.module.css";

function ChatPage() {
    return (
        <div className={style.chatPage}>
            {/* Panel izquierdo: Lista de chats */}
            <aside className={style.sidebar}>
                <ChatList />
            </aside>

            {/* Panel derecho: Subrutas (ChatEmpty o ChatWindow) */}
            <main className={style.content}>
                <Outlet />
            </main>
        </div>
    );
}

export default ChatPage;