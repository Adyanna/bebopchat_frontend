import { useState } from "react";
import { chatService } from "@features/chats/services/chat-list.service";
import { type TargetUser } from "@features/chats/entities/chat.entity";
import "./search-user-input.css";

export function SearchUserInput() {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<TargetUser | null>(null);

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setUser(null);

        try {
            const searchedUser = await chatService.searchUser(phone);
            setUser(searchedUser);
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Unable to find this user";

            setError(errorMessage);
        }
    }

    const canSubmit = phone.trim().length > 0;
    const defaultAvatar = "../src/assets/default-bounty-hunter.svg";

    return (
        <div className="search-user">
            <form onSubmit={handleSubmit} className="search-user__form">
                <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(event) => {
                        setPhone(event.target.value),
                            setUser(null);
                        setError(null)
                    }}
                    placeholder="Search by phone number"
                    className="search-user__input"
                />

                <button type="submit" disabled={!canSubmit} className="search-user__button">
                    🔍
                </button>
            </form>

            {user && (
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
                </div>
            )}

            {error && (
                <p className="search-user__error" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}