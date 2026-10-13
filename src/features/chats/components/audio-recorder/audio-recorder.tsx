import { useRef, useState } from "react"

type Props = {
    onRecordingComplete: (file: File) => void;
}

export function AudioRecorder({ onRecordingComplete }: Props) {
    const recorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<BlobPart[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function startRecording() {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });

            const mimeType = ["audio/webm", "audio/ogg"].find((type) =>
                MediaRecorder.isTypeSupported(type)
            );
            const recorder = new MediaRecorder(
                stream,
                mimeType ? { mimeType } : undefined,
            )

            recorderRef.current = recorder;
            chunksRef.current = [];

            // 1. Configuras qué hacer cuando haya datos disponibles.
            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            }

            // 2. Configuras qué hacer cuando se detenga.
            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, {
                    type: recorder.mimeType
                });

                const extension = recorder.mimeType.includes("ogg") ? "ogg" : "webm";

                const file = new File([blob], `audio-${Date.now()}.${extension}`, { type: recorder.mimeType });

                stream.getTracks().forEach((track) => track.stop());
                setIsRecording(false);

                if (file.size > 0) {
                    onRecordingComplete(file);
                }

            }
            // 3. Inicias la grabación.
            recorder.start();
            setIsRecording(true);
        } catch {
            setError("No se pudo acceder al micrófono.");
        }
    }

    function stopRecording() {
        if (recorderRef.current?.state === "recording") {
            recorderRef.current.stop();
        }
    }

    return (
        <div className="audio-recorder">
            <button type="button" className="chat-action-button" onClick={isRecording ? stopRecording : startRecording}
                aria-label={isRecording ? "Detener grabacion" : "Grabar audio"}>

                {isRecording ?
                    "■" :
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <rect x="9" y="3" width="6" height="11" rx="3" />
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"
                        />
                    </svg>
                }
            </button>

            {isRecording && <span>Grabando…</span>}
            {error && <span role="alert">{error}</span>}

        </div>
    )
}