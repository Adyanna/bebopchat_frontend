import type { ChatParticipant } from "@features/chats/entities/chat.entity";
import { useContacs } from "@features/contacts/hooks/useContacts";
import { useState } from "react";
import "./add-participants-modal.css";


type Props = {
    chatId: number;
    participants: ChatParticipant[];
    onClose: () => void;
    onParticipantsAdded: (chatId: number, particpantsIds: number[]) => Promise<void>;
}


export function AddParticipantsModal({ chatId, participants, onClose, onParticipantsAdded }: Props) {
    const { contacts, error, isLoading } = useContacs();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const participantsIds = participants.map(participant => participant.userId);
    const availableContacts = contacts.filter((contact) => !participantsIds.includes(contact.userContactId));

    const defaultAvatar = "/src/assets/default-bounty-hunter.svg";

    function toggleContact(userId: number) {
        setSelectedIds((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitError(null);
        setIsSubmitting(true);
        try {
            await onParticipantsAdded(chatId, selectedIds);
            onClose();
        } catch (error) {
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "No se pudo crear el grupo"
            );
        } finally {
            setIsSubmitting(false);
        }


    }

    return (
        <div className="add-participants-overlay">
            <form className="add-participants-form" onSubmit={handleSubmit}>
                <header className="add-participants-header">
                    <div>
                        <h2>Añadir integrantes</h2>
                        <p>Selecciona los contactos que quieras añadir al grupo.</p>
                    </div>
                    <button
                        type="button"
                        className="add-participants-close"
                        onClick={onClose}
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                </header>

                <section className="add-participants-content">
                    <h3>Contactos</h3>
                    {isLoading ? (
                        <p className="add-participants-message">Cargando contactos...</p>
                    ) : error ? (
                        <p className="add-participants-error">{error}</p>
                    ) : availableContacts.length === 0 ? (
                        <p className="add-participants-message">
                            No hay contactos disponibles para añadir.
                        </p>
                    ) : (
                        <div className="add-participants-list">
                            {availableContacts.map((contact) => (
                                <label
                                    className="add-participants-contact"
                                    key={contact.contactId}
                                >
                                    <img src={contact.profilePicture || defaultAvatar} alt="" />
                                    <span>{contact.fullname}</span>
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(contact.userContactId)}
                                        onChange={() => toggleContact(contact.userContactId)}
                                    />
                                </label>
                            ))}
                        </div>
                    )}
                    {submitError && (
                        <p className="add-participants-error">{submitError}</p>
                    )}
                </section>


                <footer className="add-participants-footer">
                    <button
                        type="button"
                        className="add-participants-cancel"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="add-participants-submit"
                        disabled={
                            selectedIds.length === 0 ||
                            isSubmitting ||
                            isLoading ||
                            !!error ||
                            availableContacts.length === 0
                        }
                    >
                        {isSubmitting ? "Añadiendo..." : "Añadir integrantes"}
                    </button>
                </footer>

            </form>
        </div>

    )
}