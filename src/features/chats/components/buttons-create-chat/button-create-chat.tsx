import './button-create-chat.css'

export interface Props {
    targetId: number;
    onCreate: (targetId: number) => void;
    fullname: string
}


export function ButtonCreateChat({ targetId, onCreate, fullname }: Props) {

    function handleCreateChat() {
        onCreate(targetId)
    }

    return (
        <button
            type="button"
            onClick={handleCreateChat}
            className="create-chat__button"
            aria-label={`Send message to ${fullname}`}
            title="Enviar mensaje"
        >
            {/* Icono de mensaje */}
            <svg viewBox="0 0 24 24" width="18"
                height="18"
                fill="currentColor"
                aria-hidden="true">

                <path d="M12 3a9 9 0 0 0-7.5 14l-1 4 4.2-1A9 9 0 1 0 12 3Z" />
            </svg>
        </button>
    )
}