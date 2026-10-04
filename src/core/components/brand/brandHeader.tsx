import style from './brandHeader.module.css';

type Props = {
    readonly title: string;
    readonly subTittle: string;
};

export const BrandHeader: React.FC<Props> = ({ title, subTittle }) => {
    return (
        <div className={style.brandSection}>
            <h1 className={style.title}>{title}</h1>
            <p className={style.subTitle}>{subTittle}</p>
        </div>
    );
};