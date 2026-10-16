import "./chat-list-footer.css";

interface ContactListFooterProps {
    onNewGroupChat: () => void;
}

export const ChatListFooter = ({ onNewGroupChat }: ContactListFooterProps) => {
    return (
        <button
            type="button"
            className="floatingButton"
            onClick={onNewGroupChat}
            title="Nuevo grupo"
            aria-label="Crear nuevo grupo"
        >
            <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <circle cx="9" cy="8" r="3" />
                <path d="M3 19v-1a6 6 0 0 1 12 0v1" />
                <path d="M19 8v6" />
                <path d="M16 11h6" />
            </svg>
        </button>
    );
};