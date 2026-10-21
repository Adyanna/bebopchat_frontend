
import styles from './status-page.module.css';
import MySpace from '../components/my-space/my-space';
import ContactsStatuses from '../components/contacts-statuses/contacts-statuses';

const StatusPage = () => {
    return (
        <main className={styles.statusPage}>
            <header className={styles.header}>
                <div>
                    <h1>Estados</h1>
                    <p>
                        Comparte momentos y descubre qué sucede en tu tripulación.
                    </p>
                </div>
            </header>

            <section className={styles.section}>
                <h2>Mi espacio</h2>
                <p className={styles.description}>
                    Comparte algo con tus contactos.
                </p>
                <MySpace />
            </section>

            <section className={styles.section}>
                <h2>Mi tripulación</h2>
                <p className={styles.description}>
                    Mira las novedades de tus contactos.
                </p>

                <div className={styles.content}>
                    <ContactsStatuses />
                </div>
            </section>
        </main>
    );
};

export default StatusPage;