import { useState } from 'react';
import styles from './status-card.module.css';
import type { MyStatus, ContactStatus } from '../../entities/status.entity';
import { statusService } from '@features/status/services/status.service';

const API_BASE_URL = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`;

interface StatusCardProps {
    status: MyStatus | ContactStatus;
    registerView: boolean;
}

const StatusCard = ({ status, registerView }: StatusCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [deleteError, setDeleteError] = useState('');

    const handleOpen = async () => {
        setIsExpanded(true);

        if (registerView) {
            try {
                await statusService.registerStatusView(status.id);
            } catch (error) {
                console.error('Error al registrar la visualización:', error);
            }
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        setDeleteError('');

        try {
            await statusService.deleteStatus(status.id);
            setIsDeleted(true);
            setShowDeleteConfirm(false);
            setIsExpanded(false);
        } catch {
            setDeleteError('No se pudo eliminar el estado.');
        } finally {
            setDeleting(false);
        }
    };


    const renderContent = () => {
        switch (status.type) {
            case 1:
                return (
                    <div
                        className={styles.textContent}
                        dangerouslySetInnerHTML={{ __html: status.content }}
                    />
                );

            case 2:
                return (
                    <img
                        className={styles.mediaContent}
                        src={`${API_BASE_URL}${status.content}`}
                        alt="Imagen del estado"
                    />
                );

            case 3:
                return (
                    <video
                        className={styles.mediaContent}
                        src={`${API_BASE_URL}${status.content}`}
                        controls
                    />
                );

            default:
                return <p>Tipo de estado no compatible.</p>;
        }
    };

    if (isDeleted) return null;
    return (
        <>
            <article
                className={styles.statusCard}
                onClick={handleOpen}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setIsExpanded(true);
                    }
                }}
            >
                <div className={styles.preview}>
                    {renderContent()}
                </div>

                <footer className={styles.footer}>
                    <div className={styles.footerActions}>
                        {'_count' in status &&
                            typeof status._count === 'object' &&
                            status._count !== null &&
                            'views' in status._count &&
                            typeof status._count.views === 'number' && (
                                <span className={styles.views} title="Visualizaciones">
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="20"
                                        height="20"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        aria-hidden="true"
                                    >
                                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    {status._count.views}
                                </span>
                            )}

                        {!registerView && (
                            <button
                                type="button"
                                className={styles.iconButton}
                                title="Eliminar estado"
                                aria-label="Eliminar estado"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setShowDeleteConfirm(true);
                                }}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    aria-hidden="true"
                                >
                                    <path d="M3 6h18" />
                                    <path d="M8 6V4h8v2" />
                                    <path d="m19 6-1 14H6L5 6" />
                                    <path d="M10 11v5M14 11v5" />
                                </svg>
                            </button>
                        )}
                        {registerView && "user" in status && (
                            <span className={styles.views} title="name">
                                {status.user.fullname}
                            </span>
                        )}
                    </div>
                </footer>
            </article>

            {isExpanded && (
                <div
                    className={styles.overlay}
                    onClick={() => setIsExpanded(false)}
                >
                    <section
                        className={styles.expandedModal}
                        role="dialog"
                        aria-modal="true"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={() => setIsExpanded(false)}
                            aria-label="Cerrar estado"
                        >
                            ×
                        </button>

                        {renderContent()}
                    </section>
                </div>
            )}

            {showDeleteConfirm && (
                <div
                    className={styles.confirmOverlay}
                    onClick={() => {
                        if (!deleting) setShowDeleteConfirm(false);
                    }}
                >
                    <section
                        className={styles.confirmModal}
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="delete-status-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h2 id="delete-status-title">Eliminar estado</h2>

                        <p>¿Seguro que quieres eliminar este estado?</p>

                        {deleteError && (
                            <p className={styles.deleteError}>{deleteError}</p>
                        )}

                        <div className={styles.confirmActions}>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                disabled={deleting}
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className={styles.deleteButton}
                                disabled={deleting}
                                onClick={handleDelete}
                            >
                                {deleting ? 'Eliminando...' : 'Sí, eliminar'}
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </>
    );


};

export default StatusCard;
