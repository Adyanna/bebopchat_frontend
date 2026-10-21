
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { uploadFile } from '@core/services/upload.service';
import type { StatusType } from '../../entities/status.entity';
import { statusService } from '../../services/status.service';
import styles from './create-multimedia-status.module.css';


interface CreateMultimediaStatusProps {
    onClose: () => void;
    onStatusCreated: () => void;
}

const CreateMultimediaStatus = ({
    onClose, onStatusCreated
}: CreateMultimediaStatusProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!file) {
            setPreviewUrl('');
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [file]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) return;

        if (
            !selectedFile.type.startsWith('image/') &&
            !selectedFile.type.startsWith('video/')
        ) {
            setError('Selecciona una imagen o un video válido.');
            setFile(null);
            return;
        }

        if (selectedFile.size > 10 * 1024 * 1024) {
            setError('El archivo no puede superar los 10 MB.');
            setFile(null);
            return;
        }

        if (
            selectedFile.type.startsWith('video/') &&
            !['video/mp4', 'video/webm'].includes(selectedFile.type)
        ) {
            setError('Los videos deben estar en formato MP4 o WebM.');
            setFile(null);
            return;
        }

        setError('');
        setFile(selectedFile);
    };

    const handlePublish = async () => {
        if (!file) {
            setError('Selecciona una imagen o un video.');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const uploadedUrl = await uploadFile(file, 'multimedia');

            const type: StatusType = file.type.startsWith('image/')
                ? 2
                : 3;

            await statusService.createStatus({
                content: uploadedUrl,
                type,
            });
            onStatusCreated();
            onClose();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'No se pudo publicar el estado.',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.multimediaContent}>
            <h2>Publicar multimedia</h2>

            <label className={styles.fileLabel}>
                Seleccionar imagen o video
                <input
                    type="file"
                    accept="image/*,video/mp4,video/webm"
                    onChange={handleFileChange}
                    disabled={loading}
                />
            </label>

            {previewUrl && file && (
                <div className={styles.preview}>
                    {file.type.startsWith('image/') ? (
                        <img src={previewUrl} alt="Vista previa" />
                    ) : (
                        <video src={previewUrl} controls />
                    )}
                </div>
            )}

            {error && (
                <p className={styles.error} role="alert">
                    {error}
                </p>
            )}

            <div className={styles.actions}>
                <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    onClick={handlePublish}
                    disabled={!file || loading}
                >
                    {loading ? 'Publicando...' : 'Publicar'}
                </button>
            </div>
        </div>
    );
};

export default CreateMultimediaStatus;
