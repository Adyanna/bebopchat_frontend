import style from "./chat-list-header.module.css";
import { SearchUserInput } from "../chat-list-input/search-user-input";

export const ChatListHeader = () => {
    return (
        <div className={style.headerContainer}>
            <SearchUserInput></SearchUserInput>
        </div>
    );
};