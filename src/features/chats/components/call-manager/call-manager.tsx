import { useAudioCall } from "@features/chats/hooks/useAudioCall";


function CallManager() {
    const { status, endCall } = useAudioCall();

    if (status === 'idle') {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-4 rounded-lg border border-cyan-400/50 bg-[#1F2833] p-4 text-[#C5C6C7] shadow-lg">
            <span>
                {status === 'calling' && 'Llamando...'}
                {status === 'incoming' && 'Llamada entrante'}
                {status === 'connected' && 'Llamada en curso'}
            </span>
            <button
                type="button"
                className="rounded-md bg-red-600 px-4 py-2 text-white"
            >
                Colgar
            </button>
        </div>
    );
}

export default CallManager;
