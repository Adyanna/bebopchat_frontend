import { Outlet } from "react-router";

function ChatLayout() {
    return (
        <div className="chat-layout">
            {/*<ChatList />*/}
            <Outlet />
        </div>
    );
}

export default ChatLayout;