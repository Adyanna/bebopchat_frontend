import './brandHeader.css';

type Props = {
    readonly title: string;
    readonly subTittle: string;
}

export const BrandHeader: React.FC<Props> = ({
    title,
    subTittle,
}) => {
    return (
        <div className="brandSection">
            <h1>{title}</h1>
            <p>{subTittle}</p>
        </div>
    );
}