import styles from './footer.module.css';
import type { Menu_Options } from '@core/types/core-types';

interface Props {
    Menu_Options: Menu_Options[];
}

export const Footer = ({ Menu_Options }: Props) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.topSection}>

                <div className={styles.links}>
                    <h3>Navegación</h3>
                    {Menu_Options.map((option, index) => (
                        <a key={index} href={option.path}>{option.label}</a>
                    ))}
                </div>

                <div className={styles.contact}>
                    <h3>Contacto</h3>

                    <p>contacto@mpractice.com</p>
                    <p>+591 70000000</p>
                    <p>Av. Principal #123, Ciudad</p>
                </div>

                <div className={styles.social}>
                    <h3>Redes</h3>

                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">LinkedIn</a>
                </div>
            </div>
            <div className={styles.bottomSection}>
                © 2026 MPRACTICE - Todos los derechos reservados
            </div>
        </footer>
    );
};