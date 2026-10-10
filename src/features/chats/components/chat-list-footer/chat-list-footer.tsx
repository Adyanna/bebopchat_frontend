import "./chat-list-footer.css";

interface ContactListFooterProps {
    onNewGroupChat: () => void;
}

export const ChatListFooter = ({ onNewGroupChat }: ContactListFooterProps) => {
    return (
        <div className="footerContainer">
            <button
                type="button"
                className="floatingButton"
                onClick={onNewGroupChat}
                title="Nuevo Chat"
            >
                +
            </button>
        </div>
    );
};