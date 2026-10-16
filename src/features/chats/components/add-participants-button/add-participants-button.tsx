
type Props = {
    onClick: () => void;
}


export function AddParticipantsButton({ onClick }: Props) {
    return (
        <button
            type="button"
            className="add-participants-button"
            onClick={onClick}
            aria-label="Añadir integrantes al grupo"
            title="Añadir integrantes"
            style={{
                display: "flex",
                width: "44px",
                height: "44px",
                alignItems: "center",
                justifyContent: "center",
                background: "#1f2833",
                color: "#66fcf1",
                border: "1px solid #66fcf1",
                borderRadius: "50%",
                cursor: "pointer",
            }}
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="10" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="16" y1="11" x2="22" y2="11" />
            </svg>
        </button>
    );
}