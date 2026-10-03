import { Link } from 'react-router';
import style from './about-page.module.css';

const AboutPage = () => {
    return (
        <div className={style.aboutContainer}>
            <header className={style.header}>
                <span className={style.badge}>CONÓCENOS</span>
                <h1 className={style.title}>Sobre BEBOPCHAT</h1>
                <p className={style.subtitle}>
                    Nuestra misión es devolver la simplicidad, velocidad y control a las interacciones digitales.
                </p>
            </header>

            <section className={style.content}>
                <div className={style.block}>
                    <h2>Nuestra Filosofía</h2>
                    <p>
                        Diseñamos BEBOPCHAT para romper con las plataformas sobrecargadas y complejas. Creemos en entornos limpios, modulares y centrados en ofrecer valor directo tanto al usuario casual como al creador.
                    </p>
                </div>

                <div className={style.statsGrid}>
                    <div className={style.statCard}>
                        <span className={style.statNumber}>100%</span>
                        <span className={style.statLabel}>Enfoque Modular</span>
                    </div>
                    <div className={style.statCard}>
                        <span className={style.statNumber}>24/7</span>
                        <span className={style.statLabel}>Disponibilidad</span>
                    </div>
                    <div className={style.statCard}>
                        <span className={style.statNumber}>0%</span>
                        <span className={style.statLabel}>Ficción, Todo Real</span>
                    </div>
                </div>
            </section>

            <div className={style.aboutCta}>
                <h2>Forma parte de la comunidad</h2>
                <p>Crea tu perfil en un par de clics y explora todo lo que tenemos para ti.</p>
                <Link to="/signup" className={style.btnPrimary}>
                    Crear mi Cuenta
                </Link>
            </div>
        </div>
    );
};

export default AboutPage;