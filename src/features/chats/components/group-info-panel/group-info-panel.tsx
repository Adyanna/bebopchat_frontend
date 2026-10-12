import type { ChatParticipant } from "@features/chats/entities/chat.entity";
import { ConfirmRemoveParticipant } from "./confirm-remove-participant";
import { useState } from "react";
import "./group-info-panel.css";

type Props = {
    onSave: (name: string, description: string) => Promise<void>;
    name: string | null;
    description: string | null;
    participants: ChatParticipant[];
    onClose: () => void;
    currentUserId: number;
    onRemoveParticipant: (userId: number) => Promise<void>;
};

export const GroupInfoPanel = ({
    onSave,
    name,
    description,
    participants,
    onClose,
    currentUserId,
    onRemoveParticipant
}: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name ?? "");
    const [editedDescription, setEditedDescription] = useState(description ?? "");
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedParticipantId, setSelectedParticipantId] = useState<number | null>(null);
    const [isRemoving, setIsRemoving] = useState(false);
    const [removeError, setRemoveError] = useState<string | null>(null);
    const [participantToRemove, setParticipantToRemove] = useState<ChatParticipant | null>(null);

    const handleSave = async () => {
        const trimmedName = editedName.trim();
        const trimmedDescription = editedDescription.trim();

        if (!trimmedName) {
            setError("El nombre del grupo no puede estar vacío");
            return;
        }

        setIsSaving(true);
        setError(null);

        try {
            await onSave(trimmedName, trimmedDescription);
            setIsEditing(false);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Error al actualizar el grupo",
            );
        } finally {
            setIsSaving(false);
        }
    };

    const handleRemoveParticipant = async (userId: number) => {
        if (!participantToRemove) return;

        setIsRemoving(true);
        setRemoveError(null);

        try {
            await onRemoveParticipant(userId);
            setSelectedParticipantId(null);
            setParticipantToRemove(null);
        } catch (error) {
            setRemoveError(
                error instanceof Error
                    ? error.message
                    : "No se pudo eliminar al participante",
            );
        } finally {
            setIsRemoving(false);
        }
    };



    const currentParticipant = participants.find(
        (participant) => participant.userId === currentUserId
    );

    const isAdmin = currentParticipant?.role === "ADMIN";

    return (
        <section
            className="group-info-panel"
            aria-label="Información del grupo"
        >
            <header className="group-info-panel__header">
                <div className="group-info-panel__avatar">
                    <span aria-hidden="true">♧</span>
                </div>

                <div className="group-info-panel__identity">
                    <h2>{name ?? "Grupo"}</h2>
                    <span>
                        {participants.length} participantes
                    </span>
                </div>

                <button
                    type="button"
                    className="group-info-panel__close"
                    onClick={onClose}
                    aria-label="Cerrar información del grupo"
                >
                    ×
                </button>
            </header>

            <div className="group-info-panel__section">
                <div className="group-info-panel__section-heading">
                    <h3>Información del grupo</h3>

                    {isAdmin && (
                        <button
                            type="button"
                            className="group-info-panel__edit"
                            onClick={() => {
                                setEditedName(name ?? "");
                                setEditedDescription(description ?? "");
                                setError(null);
                                setIsEditing(true);
                            }}
                            aria-label="Editar información del grupo"
                        >
                            ✎
                        </button>
                    )}
                </div>

                {isEditing ? (
                    <div className="group-info-panel__form">
                        <label className="group-info-panel__field">
                            <span>NOMBRE DEL GRUPO</span>
                            <input
                                value={editedName}
                                onChange={(event) => setEditedName(event.target.value)}
                                maxLength={100}
                                disabled={isSaving}
                            />
                        </label>

                        <label className="group-info-panel__field">
                            <span>DESCRIPCIÓN</span>
                            <textarea
                                value={editedDescription}
                                onChange={(event) =>
                                    setEditedDescription(event.target.value)
                                }
                                maxLength={500}
                                disabled={isSaving}
                                rows={3}
                            />
                        </label>

                        {error && (
                            <p className="group-info-panel__error" role="alert">
                                {error}
                            </p>
                        )}

                        <div className="group-info-panel__actions">
                            <button
                                type="button"
                                onClick={() => {
                                    setEditedName(name ?? "");
                                    setEditedDescription(description ?? "");
                                    setError(null);
                                    setIsEditing(false);
                                }}
                                disabled={isSaving}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? "Guardando..." : "Guardar"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="group-info-panel__field">
                            <span>NOMBRE DEL GRUPO</span>
                            <p>{name ?? "Grupo"}</p>
                        </div>

                        <div className="group-info-panel__field">
                            <span>DESCRIPCIÓN</span>
                            <p>{description || "Sin descripción"}</p>
                        </div>
                    </>
                )}
            </div>

            <div className="group-info-panel__section">
                <div className="group-info-panel__section-heading">
                    <h3>Participantes</h3>
                    <span className="group-info-panel__count">
                        {participants.length} miembros
                    </span>
                </div>

                <ul className="group-info-panel__participants">
                    {participants.map((participant) => {
                        const isCurrentUser =
                            participant.userId === currentUserId;

                        return (
                            <li
                                key={participant.userId}
                                className="group-info-panel__participant"
                            >
                                <div className="group-info-panel__participant-avatar">
                                    <span aria-hidden="true">♙</span>
                                </div>

                                <div className="group-info-panel__participant-info">
                                    <span>
                                        {participant.fullname}
                                        {isCurrentUser ? " (Tú)" : ""}
                                    </span>

                                    <span>
                                        {participant.role === "ADMIN"
                                            ? "ADMIN"
                                            : "Participante"}
                                    </span>
                                </div>

                                {isAdmin &&
                                    !isCurrentUser &&
                                    participant.role !== "ADMIN" && (
                                        <>
                                            <button
                                                type="button"
                                                className="group-info-panel__participant-menu"
                                                aria-label={`Opciones de ${participant.fullname}`}
                                                title="Opciones del participante"
                                                onClick={() =>
                                                    setSelectedParticipantId(
                                                        selectedParticipantId === participant.userId
                                                            ? null
                                                            : participant.userId,
                                                    )
                                                }
                                            >
                                                ⋯
                                            </button>

                                            {selectedParticipantId === participant.userId && (
                                                <button
                                                    type="button"
                                                    className="group-info-panel__remove-participant"
                                                    disabled={isRemoving}
                                                    onClick={() => setParticipantToRemove(participant)}
                                                >
                                                    {"Eliminar participante"}
                                                </button>
                                            )}
                                        </>
                                    )
                                }
                            </li>
                        );
                    })}
                </ul>
                {removeError && (
                    <p className="group-info-panel__error" role="alert">
                        {removeError}
                    </p>
                )}
            </div>
            {participantToRemove && (
                <ConfirmRemoveParticipant
                    participantName={participantToRemove.fullname}
                    isRemoving={isRemoving}
                    error={removeError}
                    onCancel={() => {
                        setParticipantToRemove(null);
                        setRemoveError(null);
                    }}
                    onConfirm={() =>
                        handleRemoveParticipant(participantToRemove.userId)
                    }
                />
            )}
        </section>
    );
};