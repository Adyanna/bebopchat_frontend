import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import { ChatListHeader } from '../../components/chat-list-header/chat-list-header';
import { ChatListBody } from '../../components/chat-list-body/chat-list-body';
import { ChatListFooter } from '../../components/chat-list-footer/chat-list-footer';
import { chatService } from '../../services/chat-list.service';
import { socket } from '@core/socket/socket';
import type { Chat } from '../../entities/chat.entity';
import style from './chat-list.module.css';

type Props = {
    refreshChats: number;
};

export const ChatList = ({ refreshChats }: Props) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    const { id: activeChatId } = useParams<{ id: string }>();

    const fetchChats = async () => {
        try {
            const response = await chatService.getMyChats();
            setChats(response.data || []);
        } catch (error) {
            console.error('Error al cargar la lista de chats:', error);
        }
    };

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

    const handleSelectChat = (chatId: number) => {
        if (activeChatId && Number(activeChatId) !== chatId) { socket.emit('leave_conversation', activeChatId); }
        socket.emit('join_conversation', String(chatId));
        navigate(`/chats/${chatId}`);
    };

    const handleNewChat = () => {
        // Acción pendiente para crear nuevo chat
    };

    return (
        <div className={style.chatPageContainer}>
            {/* Panel lateral izquierdo con la lista de chats */}
            <aside className={style.sidebar}>
                <ChatListHeader />
                <ChatListBody
                    chats={chats}
                    loading={loading}
                    activeChatId={activeChatId ? Number(activeChatId) : undefined}
                    onSelectChat={handleSelectChat}
                />
                <ChatListFooter onNewChat={handleNewChat} />
            </aside>
        </div>
    );
};