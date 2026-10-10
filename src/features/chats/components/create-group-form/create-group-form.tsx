import { useState } from "react";
import { useContacs } from "@features/contacts/hooks/useContacts";
import { useNavigate } from "react-router";
import { chatService } from "@features/chats/services/chat-list.service";
import './create-group-form.css'

interface Props {
    onClose: () => void;
}


export function CreateGroupForm({ onClose }: Props) {
    const { contacts, isLoading, error } = useContacs();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function toggleContact(userId: number) {
        setSelectedIds((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    }

    if (isLoading) return <p>Cargando contactos...</p>;
    if (error) return <p>{error}</p>;

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitError(null);
        setIsSubmitting(true);

        try {
            const chat = await chatService.createChat({
                name: name.trim(),
                description: description.trim(),
                participantIds: selectedIds,
            });
            onClose();
            navigate(`/chats/${chat.id}`);
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
        <form className="formContainer" onSubmit={handleSubmit}>
            <h2 className="title">Crear grupo</h2>
            <p className="subtitle">
                Forma tu propia tripulación.
            </p>

            <div className="field">
                <label className="label">Nombre del grupo</label>
                <input
                    className="input"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Ej. Tripulación del Bebop"
                    required
                />
            </div>

            <div className="field">
                <label className="label">Descripción</label>
                <textarea
                    className="textarea"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="¿De qué trata este grupo?"
                />
            </div>

            <h3 className="contactsTitle">Selecciona los miembros</h3>

            <div className="contactsList">
                {contacts.map((contact) => (
                    <label className="contactOption" key={contact.contactId}>
                        <input
                            className="checkbox"
                            type="checkbox"
                            checked={selectedIds.includes(contact.userContactId)}
                            onChange={() => toggleContact(contact.userContactId)}
                        />
                        <span className="contactName">{contact.fullname}</span>
                    </label>
                ))}
            </div>

            <p className="selectionCount">
                {selectedIds.length} miembros seleccionados
            </p>

            {submitError && (
                <p className="error" role="alert">{submitError}</p>
            )}

            <div className="actions">
                <button
                    type="button"
                    className="cancelButton"
                    onClick={onClose}
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="submitButton"
                    disabled={!name.trim() || selectedIds.length === 0 || isSubmitting}
                >
                    {isSubmitting ? "Creando..." : "Crear grupo"}
                </button>
            </div>
        </form>
    );
}