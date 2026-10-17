import { createContext, useContext, type ReactNode, } from 'react';

interface CallContextValue {
    startCall: (chatId: number, targetUserId: number) => void;
}

const CallContext = createContext<CallContextValue | null>(null);

export const CallProvider = ({ children, startCall }: { children: ReactNode; startCall: (chatId: number, targetUserId: number) => void; }) => {
    return (
        <CallContext.Provider value={{ startCall }}
        >
            {children}

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