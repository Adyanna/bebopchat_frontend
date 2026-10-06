import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import { ChatListHeader } from '../../components/chat-list-header/chat-list-header';
import { ChatListBody } from '../../components/chat-list-body/chat-list-body';
import { ChatListFooter } from '../../components/chat-list-footer/chat-list-footer';
import { chatService } from '../../services/chat-list.service';
import type { Chat } from '../../entities/chat.entity';
import style from './chat-list.module.css';

export const ChatList = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    const { id: activeChatId } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                setLoading(true);
                const response = await chatService.getMyChats();
                // Extraemos la propiedad 'data' del objeto recibido ({ data: Chat[] })
                setChats(response.data || []);
            } catch (error) {
                console.error('Error al cargar la lista de chats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, []);

    const handleSelectChat = (chatId: number) => {
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