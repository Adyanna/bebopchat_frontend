import { socket } from '@core/socket/socket';
import type { SignalData } from 'simple-peer';


//solicita iniciar una llamada
export const emitCallRequest = (chatId: number, targetUserId: number) => {
    socket.emit('call_user', {
        chatId,
        targetUserId
    });
}

export const emitAcceptCall = (chatId: number, targetUserId: number) => {
    socket.emit('accept_call', {
        chatId,
        targetUserId
    })
}

export const emitRejectCall = (chatId: number, targetUserId: number) => {
    socket.emit('reject_call', {
        chatId,
        targetUserId
    });
}

export const emitEndCall = (chatId: number, targetUserId: number) => {
    socket.emit('end_call', {
        chatId,
        targetUserId
    });
}
//Envia una señal de WebRTC al backend
export const emitCallSignal = (chatId: number, targetUserId: number, signal: SignalData) => {
    socket.emit('call_signal', {
        chatId,
        targetUserId,
        signal
    });
}
