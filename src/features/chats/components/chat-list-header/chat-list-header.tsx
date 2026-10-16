import style from "./chat-list-header.module.css";
import { SearchUserInput } from "../chat-list-input/search-user-input";
import { chatService } from "@features/chats/services/chat-list.service";
import { useNavigate } from "react-router";
import { useState } from "react";

type Props = {
    onChatCreated: () => Promise<void>;
};

export const ChatListHeader = ({ onChatCreated }: Props) => {
    const navigate = useNavigate();
    const [showUser, setShowUser] = useState(true);

    async function handleCreateChat(targetId: number) {
        try {
            const chat = await chatService.createChat({
                participantIds: [targetId]
            });

            await onChatCreated();

            setShowUser(false);

            navigate(`/chats/${chat.id}`);

        } catch (error) {
            console.error('Error al cargar el chat', error);
        }

    }

    function handleNewSearch() {
        setShowUser(true);
    }

    return (
        <div className={style.headerContainer}>
            <SearchUserInput
                onCreate={handleCreateChat}
                showUser={showUser}
                onNewSearch={handleNewSearch}
            />
        </div>
    );
};