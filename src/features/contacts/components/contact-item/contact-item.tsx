import "./contact-item.css";

type Props = {
    fullname: string;
    profilePicture: string | null;
};

export function ContactItem({
    fullname,
    profilePicture,
}: Props) {
    const defaultAvatar = "/src/assets/default-bounty-hunter.svg";

    return (
        <div className="contact-item">
            <img
                src={profilePicture || defaultAvatar}
                alt={`${fullname} profile picture`}
                className="contact-item__avatar"
            />

            <div className="contact-item__info">
                <h2 className="contact-item__name">{fullname}</h2>
                <span className="contact-item__status">Bounty hunter · Online</span>
            </div>

            <div className="contact-item__actions">
                <button
                    type="button"
                    className="contact-item__button"
                    aria-label={`Send message to ${fullname}`}
                    title="Enviar mensaje"
                >
                    {/* Icono de mensaje */}
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3a9 9 0 0 0-7.5 14l-1 4 4.2-1A9 9 0 1 0 12 3Z" />
                    </svg>
                </button>

                <button
                    type="button"
                    className="contact-item__button"
                    aria-label={`More options for ${fullname}`}
                    title="Más opciones"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="1.8" />
                        <circle cx="12" cy="12" r="1.8" />
                        <circle cx="12" cy="19" r="1.8" />
                    </svg>
                </button>
            </div>
        </div>
    );
}