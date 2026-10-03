import { Outlet } from "react-router";

function ChatPage() {
    return (
        <div className="chat-Page">
            {/*<ChatList />*/}
            <Outlet />
        </div>
    );
}

export default ChatPage;