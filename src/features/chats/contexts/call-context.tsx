import { createContext, useContext, type ReactNode, } from 'react';
import { useAudioCall } from '../hooks/useAudioCall';
import CallManager from '../components/call-manager/call-manager';

interface CallContextValue {
    startCall: (chatId: number, targetUserId: number) => Promise<void>;
}

const CallContext = createContext<CallContextValue | null>(null);

export const CallProvider = ({ children }: { children: ReactNode; }) => {
    const call = useAudioCall()

    return (
        <CallContext.Provider value={{ startCall: call.startCall }}
        >
            {children}
            <CallManager
                status={call.status}
                incomingCall={call.incomingCall}
                remoteStream={call.remoteStream}
                error={call.error}
                onAccept={call.acceptCall}
                onReject={call.rejectCall}
                onHangUp={() => call.endCall()}
            />

        </ CallContext.Provider>
    );
}

export const useCall = () => {
    const context = useContext(CallContext);

    if (!context) {
        throw new Error('useCall debe utilizarse dentro de CallProvider')
    }

    return context;
}