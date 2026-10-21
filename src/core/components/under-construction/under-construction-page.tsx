import { Link } from 'react-router';
import styles from './under-construction-page.module.css';

interface UnderConstructionPageProps {
    title?: string;
    description?: string;
}

const UnderConstructionPage = ({
    title = 'Estamos preparando algo genial',
    description = 'Esta sección todavía está en desarrollo. Estamos trabajando para que pronto puedas disfrutar de nuevas experiencias en BebopChat.',
}: UnderConstructionPageProps) => {
    return (
        <main className={styles.page}>
            <div className={styles.content}>
                <div className={styles.illustration} aria-hidden="true">
                    <div className={styles.orbit} />
                    <div className={styles.circle}>
                        <span className={styles.symbol}>✦</span>
                    </div>
                    <span className={`${styles.sparkle} ${styles.sparkleOne}`}>+</span>
                    <span className={`${styles.sparkle} ${styles.sparkleTwo}`}>✳</span>
                    <span className={`${styles.sparkle} ${styles.sparkleThree}`}>+</span>
                </div>

                <span className={styles.badge}>
                    <span className={styles.badgeDot} />
                    EN DESARROLLO
                </span>

                <h1 className={styles.title}>{title}</h1>

                <p className={styles.description}>{description}</p>

                <div className={styles.footer}>
                    <span className={styles.footerLine} />
                    <span>Algo bueno está por llegar</span>
                    <span className={styles.footerLine} />
                </div>

                <Link to="/home" className={styles.homeButton}>
                    Volver al inicio
                </Link>
            </div>
        </main>
    );
};

export default UnderConstructionPage;