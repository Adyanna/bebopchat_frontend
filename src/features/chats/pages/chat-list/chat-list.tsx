import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ChatListHeader } from '../../components/chat-list-header/chat-list-header';
import { ChatListBody } from '../../components/chat-list-body/chat-list-body';
import { chatService } from '../../services/chat-list.service';
import { socket } from '@core/socket/socket';
import type { Chat } from '../../entities/chat.entity';
import style from './chat-list.module.css';
import { ChatListFooter } from '@features/chats/components/chat-list-footer/chat-list-footer';
import { CreateGroupForm } from '@features/chats/components/create-group-form/create-group-form';

type Props = {
    refreshChats: number;
};

export const ChatList = ({ refreshChats }: Props) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showGroupForm, setShowGroupForm] = useState(false);

    const navigate = useNavigate();
    const { id: activeChatId } = useParams<{ id: string }>();

    const fetchChats = useCallback(async () => {
        try {
            setLoading(true);
            const response = await chatService.getMyChats();
            setChats(response.data || []);
        } catch (error) {
            console.error('Error al cargar la lista de chats:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const loadChats = async () => {
            setLoading(true);
            await fetchChats();
            setLoading(false);
        };
        loadChats();
    }, [refreshChats]);

    useEffect(() => {
        const handleReceiveMessage = async (message: { chatId: number }) => {

            try {
                const response = await chatService.getMyChats();
                setChats(response.data || []);
            } catch (error) {
                console.error('Error al actualizar la lista de chats:', error);
            }
        };

        socket.on('receive_message', handleReceiveMessage);

        return () => {
            socket.off('receive_message', handleReceiveMessage);
        };
    }, [activeChatId]);


    useEffect(() => {
        fetchChats();
    }, [fetchChats]);

    const handleSelectChat = (chatId: number) => {
        if (activeChatId && Number(activeChatId) !== chatId) { socket.emit('leave_conversation', activeChatId); }
        socket.emit('join_conversation', String(chatId));
        navigate(`/chats/${chatId}`);
    };


    return (
        <div className={style.chatPageContainer}>
            {/* Panel lateral izquierdo con la lista de chats */}
            <aside className={style.sidebar}>
                <ChatListHeader onChatCreated={fetchChats} />
                <ChatListBody
                    chats={chats}
                    loading={loading}
                    activeChatId={activeChatId ? Number(activeChatId) : undefined}
                    onSelectChat={handleSelectChat}
                />
                <ChatListFooter onNewGroupChat={() => setShowGroupForm(true)} />
            </aside>
            {showGroupForm && (
                <div className={style.groupModalOverlay}>
                    <div className={style.groupModal}>
                        <CreateGroupForm
                            onClose={() => setShowGroupForm(false)}
                            onChatCreated={fetchChats}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};