
import { useState } from 'react';
import CreateMultimediaStatus from '@features/status/components/create-multimedia-status/create-multimedia-status';
import CreateTextStatus from '@features/status/components/create-text-status/create-text-status';
import styles from './create-status-card.module.css';


interface CreateStatusCardProps {
    onStatusCreated: () => void;
}

export default function CreateStatusCard({ onStatusCreated }: CreateStatusCardProps) {
    const [showOptions, setShowOptions] = useState(false);
    const [showMultimedia, setShowMultimedia] = useState(false);
    const [showText, setShowText] = useState(false);

    const closeModal = () => {
        setShowOptions(false);
        setShowMultimedia(false);
        setShowText(false);
    };

    return (
        <>
            <button
                type="button"
                className={styles.createCard}
                onClick={() => setShowOptions(true)}
            >
                <span className={styles.preview}>
                    <span className={styles.plus}>+</span>
                </span>

                <span className={styles.footer}>
                    <span className={styles.title}>Crear estado</span>
                    <span className={styles.description}>Comparte algo con tus contactos</span>
                </span>
            </button>

            {showOptions && (
                <div className={styles.overlay} onClick={closeModal}>
                    <section
                        className={styles.modal}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="create-status-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {showText ? (
                            <CreateTextStatus onClose={closeModal} onStatusCreated={onStatusCreated} />
                        ) : showMultimedia ? (
                            <CreateMultimediaStatus onClose={closeModal} onStatusCreated={onStatusCreated} />
                        ) : (
                            <div className={styles.optionsContent}>
                                <h2 id="create-status-title" className={styles.modalTitle}>
                                    Crear estado
                                </h2>

                                <p className={styles.modalDescription}>
                                    ¿Qué tipo de estado quieres compartir?
                                </p>

                                <div className={styles.options}>
                                    <button
                                        type="button"
                                        className={styles.optionButton}
                                        onClick={() => setShowText(true)}
                                    >
                                        <span className={styles.optionIcon}>T</span>
                                        <span>
                                            <strong>Texto</strong>
                                            <small>Escribe algo para compartir</small>
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        className={styles.optionButton}
                                        onClick={() => setShowMultimedia(true)}
                                    >
                                        <span className={styles.optionIcon}>+</span>
                                        <span>
                                            <strong>Imagen o video</strong>
                                            <small>Comparte una foto o un video</small>
                                        </span>
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={closeModal}
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            )}
        </>
    );
}
