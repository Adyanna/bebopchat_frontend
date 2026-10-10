import style from "./chat-list-footer.module.css";

interface ContactListFooterProps {
    onNewGroupChat: () => void;
}

export const ContactListFooter = ({ onNewGroupChat }: ContactListFooterProps) => {
    return (
        <div className={style.footerContainer}>
            <button
                type="button"
                className={style.floatingButton}
                onClick={onNewGroupChat}
                title="Nuevo Chat"
            >
                +
            </button>
        </div>
    );
};