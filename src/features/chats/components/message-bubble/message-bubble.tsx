
type Props = {
    senderId: number;
    content: string;
}

export function MessageBuble({ senderId, content }: Props) {
    const currentId = 1;
    const currentUser = "ml-auto max-w-[70%] rounded-xl bg-green-500 px-4 py-2 text-white";
    const otherUser = "mr-auto max-w-[70%] rounded-xl bg-blue-500 px-4 py-2 text-white"
    const clasStyle = senderId === currentId ? currentUser : otherUser;
    return (
        <div className={clasStyle}>
            {content}
        </div>
    )
}  