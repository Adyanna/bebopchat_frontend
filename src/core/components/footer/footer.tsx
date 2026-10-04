import { Link } from 'react-router';
import type { Menu_Options } from '@core/types/core-types';
import styles from './footer.module.css';

interface Props {
    readonly Menu_Options: Menu_Options[];
}

export const Footer: React.FC<Props> = ({ Menu_Options }) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.topSection}>
                <div className={styles.column}>
                    <h3 className={styles.title}>Navegación</h3>
                    <ul className={styles.linkList}>
                        {Menu_Options.map((option, index) => (
                            <li key={index}>
                                <Link to={option.path} className={styles.link}>
                                    {option.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.title}>Contacto</h3>
                    <p className={styles.infoText}>contacto@mpractice.com</p>
                    <p className={styles.infoText}>+591 70000000</p>
                    <p className={styles.infoText}>Av. Principal #123, La Paz</p>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.title}>Redes</h3>
                    <ul className={styles.linkList}>
                        <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.link}>Facebook</a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.link}>Instagram</a></li>
                        <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.link}>LinkedIn</a></li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottomSection}>
                <p>© {new Date().getFullYear()} BEBOPCHAT - Todos los derechos reservados</p>
            </div>
        </footer>
    );
};