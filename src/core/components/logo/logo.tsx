import "./logo.css";

type Props = {
    readonly srclogo: string;
}

export const Logo: React.FC<Props> = ({ srclogo }) => {
    return (
        <img src={srclogo} alt="Logo" className="logoElement" />
    );
}