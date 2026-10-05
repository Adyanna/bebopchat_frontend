import { Outlet } from "react-router";

function ChatPage() {
    console.log('estoy en chatpage')
    return (
        <div className="chat-Page">
            {/*<ChatList />*/}
            <Outlet />
        </div>
    );
}

export default ChatPage;