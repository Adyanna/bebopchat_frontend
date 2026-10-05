import style from "./chat-list-header.module.css";

export const ChatListHeader = () => {
    return (
        <div className={style.headerContainer}>
            <input
                type="text"
                placeholder="BUSCAR..."
                className={style.searchInput}
            />
        </div>
    );
};