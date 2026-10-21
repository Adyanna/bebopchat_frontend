
import { useState } from 'react';
import { statusService } from '../../services/status.service';
import styles from './create-text-status.module.css';

interface CreateTextStatusProps {
    onClose: () => void;
    onStatusCreated: () => void;
}

const backgrounds = [
    { name: 'Turquesa', value: 'linear-gradient(135deg, #173F43, #253D4A)' },
    { name: 'Morado', value: 'linear-gradient(135deg, #633B75, #302044)' },
    { name: 'Rosa', value: 'linear-gradient(135deg, #A63D55, #632D50)' },
    { name: 'Naranja', value: 'linear-gradient(135deg, #B8782C, #743E28)' },
    { name: 'Oscuro', value: '#20252D' },
    { name: 'Claro', value: '#F1E7D0' },
];

const fonts = [
    { name: 'Normal', value: 'Arial, sans-serif' },
    { name: 'Elegante', value: 'Georgia, serif' },
    { name: 'Fuerte', value: 'Impact, sans-serif' },
];

const decorations = ['✨', '❤️', '🌙', '⭐', '🌸', '☀️'];

const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (character) => {
        const entities: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        };

        return entities[character];
    });

const CreateTextStatus = ({ onClose, onStatusCreated }: CreateTextStatusProps) => {
    const [content, setContent] = useState('');
    const [background, setBackground] = useState(backgrounds[0].value);
    const [font, setFont] = useState(fonts[0].value);
    const [textColor, setTextColor] = useState('#FFFFFF');
    const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('center');
    const [fontSize, setFontSize] = useState(28);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const insertDecoration = (decoration: string) => {
        setContent((previous) => previous + decoration);
    };

    const createHtml = (text: string) => `
        <div style="
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            min-height: 14rem;
            padding: 1.5rem;
            overflow-wrap: anywhere;
            background: ${background};
            color: ${textColor};
            font-family: ${font};
            font-size: ${fontSize}px;
            text-align: ${alignment};
            white-space: pre-wrap;
        ">${escapeHtml(text)}</div>
    `;

    const handlePublish = async () => {
        if (!content.trim()) {
            setError('Escribe algo antes de publicar.');
            return;
        }

        try {
            setLoading(true);
            setError('');

            await statusService.createStatus({
                content: createHtml(content.trim()),
                type: 1,
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
        <section className={styles.modal}>
            <h2>Crear estado de texto</h2>

            <div className={styles.editorLayout}>
                <div className={styles.editorPanel}>
                    <label>
                        Tu texto
                        <textarea
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            placeholder="¿Qué quieres compartir?"
                            maxLength={500}
                            rows={4}
                            disabled={loading}
                        />
                    </label>

                    <p>{content.length}/500 caracteres</p>

                    <label>
                        Tipo de letra
                        <select
                            value={font}
                            onChange={(event) => setFont(event.target.value)}
                            disabled={loading}
                        >
                            {fonts.map((item) => (
                                <option key={item.name} value={item.value}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Fondo
                        <div className={styles.colorOptions}>
                            {backgrounds.map((item) => (
                                <button
                                    key={item.name}
                                    type="button"
                                    title={item.name}
                                    aria-label={`Fondo ${item.name}`}
                                    className={
                                        background === item.value
                                            ? styles.selectedColor
                                            : styles.colorOption
                                    }
                                    style={{ background: item.value }}
                                    onClick={() => setBackground(item.value)}
                                    disabled={loading}
                                />
                            ))}
                        </div>
                    </label>

                    <label>
                        Color del texto
                        <select
                            value={textColor}
                            onChange={(event) => setTextColor(event.target.value)}
                            disabled={loading}
                        >
                            <option value="#FFFFFF">Blanco</option>
                            <option value="#000000">Negro</option>
                            <option value="#FFB400">Amarillo</option>
                            <option value="#66FCF1">Turquesa</option>
                        </select>
                    </label>

                    <label>
                        Alineación
                        <select
                            value={alignment}
                            onChange={(event) =>
                                setAlignment(event.target.value as typeof alignment)
                            }
                            disabled={loading}
                        >
                            <option value="left">Izquierda</option>
                            <option value="center">Centro</option>
                            <option value="right">Derecha</option>
                        </select>
                    </label>

                    <label>
                        Tamaño de letra: {fontSize}px
                        <input
                            type="range"
                            min={16}
                            max={40}
                            value={fontSize}
                            onChange={(event) =>
                                setFontSize(Number(event.target.value))
                            }
                            disabled={loading}
                        />
                    </label>

                    <div>
                        <p>Decoradores</p>
                        <div className={styles.decorations}>
                            {decorations.map((decoration) => (
                                <button
                                    key={decoration}
                                    type="button"
                                    onClick={() => insertDecoration(decoration)}
                                    disabled={loading}
                                >
                                    {decoration}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.previewPanel}>
                    <h3>Vista previa</h3>
                    <div
                        className={styles.textPreview}
                        dangerouslySetInnerHTML={{
                            __html: createHtml(
                                content || 'Tu historia aparecerá aquí...',
                            ),
                        }}
                    />
                </div>
            </div>

            {error && <p className={styles.error} role="alert">{error}</p>}

            <div className={styles.actions}>
                <button type="button" onClick={onClose} disabled={loading}>
                    Cancelar
                </button>
                <button
                    type="button"
                    onClick={handlePublish}
                    disabled={loading || !content.trim()}
                >
                    {loading ? 'Publicando...' : 'Publicar'}
                </button>
            </div>
        </section>
    );
};

export default CreateTextStatus;
