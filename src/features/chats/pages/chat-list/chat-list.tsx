import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ChatListHeader } from '../../components/chat-list-header/chat-list-header';
import { ChatListBody } from '../../components/chat-list-body/chat-list-body';
import { chatService } from '../../services/chat-list.service';
import type { Chat } from '../../entities/chat.entity';
import style from './chat-list.module.css';
import { ChatListFooter } from '@features/chats/components/chat-list-footer/chat-list-footer';
import { CreateGroupForm } from '@features/chats/components/create-group-form/create-group-form';

export const ChatList = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showGroupForm, setShowGroupForm] = useState(false);

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
                <ChatListFooter onNewGroupChat={() => setShowGroupForm(true)} />
            </aside>
            {showGroupForm && (
                <div className={style.groupModalOverlay}>
                    <div className={style.groupModal}>
                        <CreateGroupForm onClose={() => setShowGroupForm(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};