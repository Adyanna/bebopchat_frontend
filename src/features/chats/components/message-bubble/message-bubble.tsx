
type Props = {
    senderId: number;
    content: string;
}

export function MessageBuble({ senderId, content }: Props) {
    const currentId = 1;
    const currentUser =
        "flex w-fit max-w-[65%] flex-col self-end rounded-2xl rounded-br-md bg-[#A8C686] !px-6 py-3 text-left text-sm text-[#263238] shadow-sm";

    const otherUser =
        "flex w-fit max-w-[65%] flex-col self-start rounded-2xl rounded-bl-md bg-[#1F2833] !px-6 py-3 text-left text-sm text-[#C5C6C7] shadow-sm";
    const clasStyle = senderId === currentId ? currentUser : otherUser;
    return (
        <div className={clasStyle}>
            <div className="break-words">{content}</div>
            <div className="mt-1 self-end whitespace-nowrap text-[11px] opacity-70">4:08 p.m.</div>
        </div>
    )
}  