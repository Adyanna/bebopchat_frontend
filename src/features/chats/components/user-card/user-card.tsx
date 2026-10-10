import type { TargetUser } from "@features/chats/entities/chat.entity";
import { useState } from "react";
import "./user-card.css";
import { contactService } from "@features/contacts/services/contact.service";

type props = {
    user: TargetUser,
    defaultAvatar: string,
    onCreate: (targetId: number) => void
}


export function UserCard({ user, defaultAvatar, onCreate }: props) {
    const [isAdded, setIsAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasAddError, setHasAddError] = useState(false);

    async function handleAddContact() {

        setIsLoading(true);
        try {
            await contactService.addContact(Number(user.id));
            setIsAdded(true);
        } catch {
            setHasAddError(true);
        } finally {
            setIsLoading(false);
        }

    }

    function handleCreateChat() {
        onCreate(user.id)
    }


    return (
        <div className="search-user__card">

            <img
                src={user.profilePicture || defaultAvatar}
                alt={`${user.fullname} profile picture`}
                className="search-user__avatar"
            />
            <div className="search-user__info">
                <p className="search-user__name">{user.fullname}</p>
                <p className="search-user__phone">{user.phone}</p>
            </div>

            <div className="contact-actions">
                {!hasAddError && (
                    <button
                        className="contact-action-button"
                        type="button"
                        aria-label={isAdded ? "Contact added" : "Add contact"}
                        title={isAdded ? "Contact added" : "Add contact"}
                        onClick={handleAddContact}
                        disabled={isLoading || isAdded}
                    >
                        {isAdded ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m5 12 4 4L19 6" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="9" cy="8" r="4" />
                                <path d="M3 21v-2a6 6 0 0 1 6-6h2" />
                                <path d="M19 14v6" />
                                <path d="M16 17h6" />
                            </svg>
                        )}
                    </button>
                )}

                <button
                    className="contact-action-button"
                    type="button"
                    aria-label="Start chat"
                    title="Start chat"
                    onClick={handleCreateChat}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
                    </svg>
                </button>
            </div>
        </div>
    )

}