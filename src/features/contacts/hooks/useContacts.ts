import { useEffect, useState } from "react";
import { type Contact } from "../entities/contact.entity";
import { contactService } from "../services/contact.service";

export function useContacs() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [before, setBefore] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadInitial = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const initial = await contactService.getMyContacts();

                setContacts(initial.data);
                setHasMore(initial.hasMore);
                setBefore(initial.meta.nextBefore);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Ha ocurrido un error';
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        loadInitial();
    }, []);

    const fetchMore = async () => {
        if (isFetchingMore || !hasMore || contacts.length === 0) return;

        setIsFetchingMore(true);

        try {
            const more = await contactService.getMyContacts({
                before: before ?? undefined,
            });

            setContacts((prev) => [...prev, ...more.data]);
            setHasMore(more.hasMore);
            setBefore(more.meta.nextBefore);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Ha ocurrido un error';
            setError(errorMessage);
        }

        finally {
            setIsFetchingMore(false);
        }
    };

    const deleteContact = async (userContactId: number) => {
        try {
            await contactService.deleteContact(userContactId);

            setContacts((prev) =>
                prev.filter(
                    (contact) => contact.userContactId !== userContactId
                )
            );
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'No se pudo eliminar el contacto';

            throw new Error(errorMessage);
        }
    };

    return {
        contacts,
        isFetchingMore,
        hasMore,
        fetchMore,
        error,
        isLoading,
        deleteContact,
    }

}