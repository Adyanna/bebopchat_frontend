import { useContacs } from "@features/contacts/hooks/useContacts"
import { useRef, useEffect, } from "react";
import { ContactItem } from "../contact-item/contact-item";
import { useNavigate } from "react-router";
import { chatService } from "@features/chats/services/chat-list.service";
import './contact-list.css'

export function ContactList() {
    const {
        contacts,
        isFetchingMore,
        hasMore,
        fetchMore,
        error,
        isLoading
    } = useContacs();

    const containerRef = useRef<HTMLDivElement>(null);
    const isInitialLoad = useRef(true);
    const navigate = useNavigate();
    useEffect(() => {
        const element = containerRef.current;
        if (!element || contacts.length === 0) return;

        if (isInitialLoad.current) {
            element.scrollTop = element.scrollHeight;
            isInitialLoad.current = false;
        }
    }, [contacts]);

    const handleScroll = () => {
        const element = containerRef.current;
        if (!element) return;
        if (
            element.scrollHeight - element.scrollTop - element.clientHeight < 100 &&
            !isFetchingMore &&
            hasMore
        ) {
            fetchMore();
        }
    }

    async function handleCreateChat(targetId: number) {
        try {
            const chat = await chatService.createChat({
                participantIds: [targetId]
            });

            navigate(`/chats/${chat.id}`);

        } catch (error) {
            console.error('Error al cargar el chat', error);
        }

    }

    if (isLoading) return <p>Cargando...</p>
    if (error) return <p>{error}</p>

    return (
        <div ref={containerRef} className="" onScroll={handleScroll}>
            {isFetchingMore &&
                <span className="text-center p-2">Cargando...</span>}
            {contacts.map((contact) => (
                <ContactItem
                    key={contact.contactId}
                    targetId={contact.userContactId}
                    fullname={contact.fullname}
                    profilePicture={contact.profilePicture}
                    onCreate={handleCreateChat}
                />
            ))}
        </div>
    )
}