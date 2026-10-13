type Props = {
    url: string;
    type: "IMAGE" | "VIDEO";
};

export function MessageMedia({ url, type }: Props) {
    const mediaUrl = new URL(
        url,
        `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`,
    ).href;

    if (type === "IMAGE") {
        return (
            <img
                src={mediaUrl}
                alt="Imagen enviada"
                className="max-h-80 max-w-full rounded-lg object-contain"
            />
        );
    }

    if (type === "VIDEO") {
        return (
            <video
                src={mediaUrl}
                controls
                className="max-h-80 max-w-full rounded-lg"
            />
        );
    }

    return null;
}