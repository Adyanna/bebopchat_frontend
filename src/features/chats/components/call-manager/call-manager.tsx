import { useEffect, useRef } from 'react';
import type { CallStatus } from "@features/chats/hooks/useAudioCall";

interface CallManagerProps {
    status: CallStatus;
    incomingCall: { chatId: number; callerId: number } | null;
    remoteStream: MediaStream | null;
    error: string | null;
    onAccept: () => void;
    onReject: () => void;
    onHangUp: () => void;
}


function CallManager({
    status,
    incomingCall,
    remoteStream,
    error,
    onAccept,
    onReject,
    onHangUp
}: CallManagerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.srcObject = remoteStream;
            if (remoteStream) {
                void audioRef.current.play().catch(() => {
                    // El navegador puede requerir interacción del usuario.
                })
            }
        }

    }, [remoteStream]);

    if (status === 'idle') {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-4 rounded-lg border border-cyan-400/50 bg-[#1F2833] p-4 text-[#C5C6C7] shadow-lg">
            <audio ref={audioRef} autoPlay />
            {status === 'calling' && 'Llamando...'}
            {status === 'incoming' && 'Llamada entrante'}
            {status === 'connected' && 'Llamada en curso'}

            {error && <p role="alert" className="text-red-400">{error}</p>}

            {status === 'incoming' && incomingCall && (
                <div className="flex gap-2">
                    <button type='button' onClick={onAccept} className="rounded-md bg-emerald-600 px-3 py-2 text-white">
                        Contestar
                    </button>

                    <button
                        type="button"
                        onClick={onReject}
                        className="rounded-md bg-red-600 px-4 py-2 text-white"
                    >
                        Rechazar
                    </button>
                </div>
            )}

            {(status === 'calling' || status === 'connected') && (
                <button type='button' onClick={onHangUp} className="rounded-md bg-red-600 px-4 py-2 text-white">
                    Colgar
                </button>
            )}
        </div>
    );
}

export default CallManager;
