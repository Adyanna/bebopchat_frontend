import { ButtonCreateChat } from "@features/chats/components/buttons-create-chat/button-create-chat";
import "./contact-item.css";

type Props = {
    targetId: number;
    fullname: string;
    profilePicture: string | null;
    onCreate: (targetId: number) => void
};

export function ContactItem({
    targetId,
    fullname,
    profilePicture,
    onCreate
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
                <ButtonCreateChat
                    targetId={targetId}
                    onCreate={onCreate}
                    fullname={fullname}
                />

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