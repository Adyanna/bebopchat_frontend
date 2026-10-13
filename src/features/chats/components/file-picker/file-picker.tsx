import { useRef } from "react";

type Props = {
    onFileSelected: (file: File) => void;
};

export function FilePicker({ onFileSelected }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const file = event.target.files?.[0];

        if (file) {
            onFileSelected(file);
        }

        // Permite volver a seleccionar el mismo archivo.
        event.target.value = "";
    }

    return (
        <>
            <button
                type="button"
                className="chat-action-button"
                aria-label="Seleccionar foto o vídeo"
                onClick={() => fileInputRef.current?.click()}
            >
                +
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                hidden
                onChange={handleFileChange}
            />
        </>
    );

}