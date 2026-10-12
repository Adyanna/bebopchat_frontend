
import "./confirm-remove-participant.css";

type Props = {
    participantName: string;
    isRemoving: boolean;
    error: string | null;
    onCancel: () => void;
    onConfirm: () => Promise<void>;
};

export const ConfirmRemoveParticipant = ({
    participantName,
    isRemoving,
    error,
    onCancel,
    onConfirm,
}: Props) => {
    return (
        <div className="confirm-remove-participant__overlay">
            <section
                className="confirm-remove-participant"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-remove-participant-title"
            >
                <h2 id="confirm-remove-participant-title">
                    Confirmar eliminación
                </h2>

                <p>
                    ¿Quieres eliminar a <strong>{participantName}</strong> del grupo?
                </p>

                {error && (
                    <p className="confirm-remove-participant__error" role="alert">
                        {error}
                    </p>
                )}

                <div className="confirm-remove-participant__actions">
                    <button
                        type="button"
                        disabled={isRemoving}
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        disabled={isRemoving}
                        onClick={onConfirm}
                    >
                        {isRemoving ? "Eliminando..." : "Eliminar"}
                    </button>
                </div>
            </section>
        </div>
    );
};
