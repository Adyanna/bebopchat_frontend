import { useCallback, useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import type { Instance, SignalData } from 'simple-peer';
import { socket } from '@core/socket/socket';
import { emitAcceptCall, emitCallRequest, emitCallSignal, emitEndCall, emitRejectCall, } from '../services/callService';
import iceServers from "@core/config/ice-servers";

export type CallStatus = | 'idle' | 'calling' | 'incoming' | 'connected';

export interface IncomingCall {
    chatId: number;
    callerId: number;
}

export interface CallSignal {
    chatId: number;
    fromUserId: number;
    signal: SignalData;
}

interface ActiveCall {
    chatId: number;
    targetUserId: number;
}

export const useAudioCall = () => {
    //status: indica el estado visual de la llamada.
    const [status, setStatus] = useState<CallStatus>('idle');
    const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    //peerRef: guardará la conexión WebRTC.
    const peerRef = useRef<Instance | null>(null);

    const localStreamRef = useRef<MediaStream | null>(null);
    const activeCallRef = useRef<ActiveCall | null>(null);
    const pendingSignalsRef = useRef<SignalData[]>([]);
    const statusRef = useRef<CallStatus>('idle');

    const updateStatus = useCallback((nextStatus: CallStatus) => {
        statusRef.current = nextStatus;
        setStatus(nextStatus);
    }, []);

    //getMicrophone(): solicita acceso al micrófono y reutiliza el flujo si ya existe.
    const getMicrophone = useCallback(async () => {
        if (localStreamRef.current) {
            return localStreamRef.current;
        }
        if (!navigator.mediaDevices?.getUserMedia) {
            throw new Error(
                'El navegador no permite acceder al micrófono en este contexto.',
            );
        }

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
        });

        localStreamRef.current = stream;
        return stream;
    }, []);

    const createPeer = useCallback((initiator: boolean, chatId: number, targetUserId: number, stream: MediaStream) => {
        peerRef.current?.destroy();
        pendingSignalsRef.current = [];

        const peer = new Peer({ initiator, stream, trickle: false, config: { iceServers } });

        peerRef.current = peer;

        peer.on('signal', ((signal) => {
            console.log('WEBRTC: señal generada', signal.type);
            emitCallSignal(chatId, targetUserId, signal as SignalData);
        }));

        peer.on('connect', () => {
            console.log('WEBRTC: conexión establecida');
            updateStatus('connected');
        });

        peer.on('stream', (stream) => {
            console.log('WEBRTC: audio remoto recibido', stream);
            setRemoteStream(stream);
            updateStatus('connected')
        });

        peer.on('error', () => {
            setError('No se pudo establecer la conexion de audio');
            peer.destroy();
        });

        peer.on('close', () => {
            peerRef.current = null;
        });

        return peer;
    }, [updateStatus]);

    //endCall(): cierra la conexión, detiene el micrófono y devuelve el estado a idle.
    const endCall = useCallback((notify = true) => {
        const call = activeCallRef.current;

        if (notify && call) {
            emitEndCall(call.chatId, call.targetUserId);
        }

        peerRef.current?.destroy();
        peerRef.current = null;

        localStreamRef.current?.getTracks().forEach((track) => {
            track.stop();
        });

        localStreamRef.current = null;

        setRemoteStream(null);
        setIncomingCall(null);
        setError(null);
        activeCallRef.current = null;
        pendingSignalsRef.current = [];
        updateStatus('idle');
    }, [updateStatus]);

    const startCall = useCallback(async (chatId: number, targetUserId: number) => {
        if (statusRef.current !== 'idle') return;

        try {
            setError(null);
            activeCallRef.current = { chatId, targetUserId };
            updateStatus('calling');

            await getMicrophone();
            emitCallRequest(chatId, targetUserId);
        } catch {
            setError('No se pudo acceder al microfono');
            endCall(false);
        }
    }, [endCall, getMicrophone, updateStatus]);

    const acceptCall = useCallback(async () => {
        if (!incomingCall || statusRef.current !== 'incoming') return
        const { chatId, callerId } = incomingCall;

        try {
            setError(null);
            const stream = await getMicrophone();
            activeCallRef.current = {
                chatId,
                targetUserId: callerId
            }

            emitAcceptCall(chatId, callerId);
            setIncomingCall(null);

            const peer = createPeer(false, chatId, callerId, stream);
            for (const signal of pendingSignalsRef.current) {
                peer.signal(signal);
            }

            pendingSignalsRef.current = [];
        } catch {
            emitRejectCall(chatId, callerId);
            setError('No se pudo acceder al micrófono.');
            endCall(false);
        }

    }, [createPeer, endCall, getMicrophone, incomingCall]);

    const rejectCall = useCallback(() => {
        if (!incomingCall) return;

        emitRejectCall(incomingCall.chatId, incomingCall.callerId);

        setIncomingCall(null);
        activeCallRef.current = null;
        pendingSignalsRef.current = [];
        updateStatus('idle');
    }, [incomingCall, updateStatus]);

    useEffect(() => {
        const handleIncomingCall = (data: IncomingCall) => {
            if (statusRef.current !== 'idle') {
                emitRejectCall(data.chatId, data.callerId);
                return;
            }
            setIncomingCall(data);
            updateStatus('incoming');
        }

        const handleCallAccepted = async (data: {
            chatId: number;
            userId: number;
        }) => {
            console.log('FRONTEND: call_accepted recibido', data);
            const call = activeCallRef.current;
            if (!call || call.chatId !== data.chatId || call.targetUserId !== data.userId || statusRef.current !== 'calling') {
                return;
            }

            try {
                const stream = await getMicrophone();
                console.log('Micrófono obtenido:', stream.getAudioTracks().length);
                createPeer(true, call.chatId, call.targetUserId, stream);
                console.log('createPeer ejecutado');
            } catch (error) {
                console.error('Error al preparar la llamada:', error);
                setError('No se pudo acceder al micrófono.');
                endCall();
            }
        }

        const handleCallRejected = (data: {
            chatId: number;
            userId: number;
        }) => {
            const call = activeCallRef.current;

            if (call?.chatId === data.chatId && call.targetUserId === data.userId) {
                setError('La otra persona rechazó la llamada.');
                endCall(false);
            }
        };

        const handleCallEnded = (data: {
            chatId: number;
            userId: number;
        }) => {
            const call = activeCallRef.current;
            if (call?.chatId === data.chatId && call.targetUserId === data.userId) {
                endCall(false);
            } else if (incomingCall?.chatId === data.chatId && incomingCall.callerId === data.userId) {
                setIncomingCall(null);
                updateStatus('idle');
            }
        };

        const handleCallSignal = (data: CallSignal) => {
            const call = activeCallRef.current;

            if (!call || call.chatId !== data.chatId || call.targetUserId !== data.fromUserId) {
                return;
            }
            if (peerRef.current) {
                peerRef.current.signal(data.signal);
            } else {
                pendingSignalsRef.current.push(data.signal);
            }
        }

        const handleCallError = (data: { message?: string }) => {
            setError(data.message ?? 'Ocurrió un error con la llamada.');
            endCall(false);
        };

        socket.on('incoming_call', handleIncomingCall);
        socket.on('call_accepted', handleCallAccepted);
        socket.on('call_rejected', handleCallRejected);
        socket.on('call_ended', handleCallEnded);
        socket.on('call_signal', handleCallSignal);
        socket.on('call_error', handleCallError);

        return () => {
            socket.off('incoming_call', handleIncomingCall);
            socket.off('call_accepted', handleCallAccepted);
            socket.off('call_rejected', handleCallRejected);
            socket.off('call_ended', handleCallEnded);
            socket.off('call_signal', handleCallSignal);
            socket.off('call_error', handleCallError);
        };


    }, [createPeer, endCall, getMicrophone, incomingCall, updateStatus]);

    //useEffect: libera los recursos cuando se desmonta CallManager.
    useEffect(() => {
        return () => {
            peerRef?.current?.destroy();
            localStreamRef.current?.getTracks().forEach((track) => {
                track.stop();
            });
        }
    }, []);

    return {
        status,
        incomingCall,
        remoteStream,
        error,
        startCall,
        acceptCall,
        rejectCall,
        endCall,
    };
}