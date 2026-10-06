import style from "./chat-list-footer.module.css";

interface ChatListFooterProps {
    onNewChat?: () => void;
}

export const ChatListFooter = ({ onNewChat }: ChatListFooterProps) => {
    return (
        <div className={style.footerContainer}>
            <button
                type="button"
                className={style.floatingButton}
                onClick={onNewChat}
                title="Nuevo Chat"
            >
                +
            </button>
        </div>
    );
};