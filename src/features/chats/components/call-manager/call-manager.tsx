import { useEffect, useRef } from 'react';
import type { CallStatus } from "@features/chats/hooks/useAudioCall";
import './call-manager.css';
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
        if (status !== 'incoming' || !incomingCall) {
            return;
        }

        const ringtone = new Audio('/sounds/bebop_robotic_ringtone.wav');
        ringtone.loop = true;

        void ringtone.play().catch(() => {
            // El navegador puede bloquear la reproducción automática.
        });

        return () => {
            ringtone.pause();
            ringtone.currentTime = 0;
        };
    }, [status, incomingCall]);

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
        <div className="call-manager">
            <audio ref={audioRef} autoPlay />

            <header className="call-manager__header">
                <div className="call-manager__brand">
                    <span className="call-manager__brand-icon">◈</span>
                    <span>BEBOP COMMS</span>
                </div>

                <span className={`call-manager__badge call-manager__badge--${status}`}>
                    {status === 'incoming' && 'INCOMING'}
                    {status === 'connected' && 'CONNECTED'}
                    {status === 'calling' && 'CALLING'}
                </span>
            </header>

            <div className="call-manager__body">
                <div className="call-manager__info">
                    <div
                        className={`call-manager__icon call-manager__icon--${status}`}
                        aria-hidden="true"
                    >
                        {status === 'connected' ? '⌁' : '⌕'}
                    </div>

                    <div className="call-manager__details">
                        <p className="call-manager__title">
                            {status === 'calling' && 'Llamando...'}
                            {status === 'incoming' && 'Llamada entrante'}
                            {status === 'connected' && 'Llamada en curso'}
                        </p>

                        <p className="call-manager__subtitle">
                            {status === 'connected' && 'Canal de audio conectado'}
                            {status === 'incoming' && 'Esperando respuesta'}
                            {status === 'calling' && 'Esperando conexión'}
                        </p>
                    </div>
                </div>

                {status === 'calling' && (
                    <div className="call-manager__progress">
                        <div className="call-manager__progress-bar" />
                    </div>
                )}

                {error && (
                    <p className="call-manager__error" role="alert">
                        {error}
                    </p>
                )}

                {status === 'incoming' && incomingCall && (
                    <div className="call-manager__actions">
                        <button
                            type="button"
                            onClick={onAccept}
                            className="call-manager__button call-manager__button--accept"
                        >
                            Contestar
                        </button>

                        <button
                            type="button"
                            onClick={onReject}
                            className="call-manager__button call-manager__button--reject"
                        >
                            Rechazar
                        </button>
                    </div>
                )}

                {(status === 'calling' || status === 'connected') && (
                    <button
                        type="button"
                        onClick={onHangUp}
                        className="call-manager__button call-manager__button--hangup"
                    >
                        Colgar
                    </button>
                )}

                <footer className="call-manager__footer">
                    AUDIO CHANNEL // BEBOP SYSTEMS
                </footer>
            </div>
        </div>
    );
}

export default CallManager;
