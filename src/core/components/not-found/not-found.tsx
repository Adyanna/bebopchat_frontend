import { Link } from 'react-router';
import style from './not-found.module.css';

export const NotFoundPage = () => {
    return (
        <div className={style.container}>
            <div className={style.glitchWrapper}>
                <h1 className={style.title} data-text="404">404</h1>
            </div>

            <div className={style.subHeader}>
                <span className={style.statusTag}>ERR_SIGNAL_LOST</span>
                <p className={style.message}>
                    La coordenada a la que intentas acceder no existe o fue eliminada de la red.
                </p>
            </div>

            <Link to="/" className={style.link}>
                <span className={style.linkIcon}>◀</span>
                Volver a la Terminal
            </Link>
        </div>
    );
};
