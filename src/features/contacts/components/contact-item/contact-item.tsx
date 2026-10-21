import { ButtonCreateChat } from "@features/chats/components/buttons-create-chat/button-create-chat";
import { useState, useId } from "react";
import { API_URL } from "@features/chats/services/chat-list.service";
import defaultAvatar from "@assets/default-bounty-hunter.svg";

import "./contact-item.css";

type Props = {
    targetId: number;
    fullname: string;
    profilePicture: string | null;
    onCreate: (targetId: number) => void
    onDelete: (userContactId: number) => Promise<void>;
};

export function ContactItem({
    targetId,
    fullname,
    profilePicture,
    onCreate,
    onDelete
}: Props) {
    const [showOptions, setShowOptions] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const deleteTitleId = useId();

    const photoUrl = profilePicture ? `${API_URL}${profilePicture}` : defaultAvatar;

    return (
        <div className="contact-item">
            <img
                src={photoUrl}
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
                    onClick={() => setShowOptions((prev) => !prev)}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="1.8" />
                        <circle cx="12" cy="12" r="1.8" />
                        <circle cx="12" cy="19" r="1.8" />
                    </svg>
                </button>

                {showOptions && (
                    <button
                        type="button"
                        className="contact-item__delete-option"
                        onClick={() => {
                            setShowOptions(false);
                            setShowDeleteConfirmation(true);
                        }}
                    >
                        Eliminar contacto
                    </button>
                )}
            </div>
            {showDeleteConfirmation && (
                <div className="contact-item__modal-overlay">
                    <div
                        className="contact-item__modal"
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby={deleteTitleId}
                    >
                        <h2 id={deleteTitleId}>¿Eliminar contacto?</h2>

                        <p>
                            ¿Estás segura de que quieres eliminar a {fullname}
                            de tus contactos?
                        </p>

                        <div className="contact-item__modal-actions">
                            <button
                                type="button"
                                onClick={() => setShowDeleteConfirmation(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={async () => {
                                    try {
                                        await onDelete(targetId);
                                        setShowDeleteConfirmation(false);
                                    } catch (error) {
                                        console.error(
                                            "Error al eliminar el contacto:",
                                            error
                                        );
                                    }
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}