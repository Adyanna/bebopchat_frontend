import { Link } from 'react-router';
import style from './home-page.module.css';

const HomePage = () => {
    return (
        <div className={style.homeContainer}>
            {/* Hero Section */}
            <section className={style.hero}>
                <span className={style.badge}>▪ BEBOPCHAT SYSTEM</span>
                <h1 className={style.title}>
                    Plataforma Integral de <span className={style.highlight}>Comunicación & Entretenimiento</span>
                </h1>
                <p className={style.description}>
                    Conecta en tiempo real, comparte contenido con tu comunidad y accede a módulos de entretenimiento exclusivos en un solo entorno rápido, moderno y seguro.
                </p>
                <div className={style.heroActions}>
                    <Link to="/signup" className={style.btnPrimary}>
                        Crear Cuenta Gratis
                    </Link>
                    <Link to="/services" className={style.btnSecondary}>
                        Explorar Funciones
                    </Link>
                </div>
            </section>

            {/* Features Preview */}
            <section className={style.features}>
                <h2 className={style.sectionTitle}>¿Por qué elegir MPRACTICE?</h2>
                <div className={style.grid}>
                    <div className={style.card}>
                        <div className={style.cardIcon}>⚡</div>
                        <h3>Comunicación Fluida</h3>
                        <p>Interactúa al instante con mensajería rápida, feeds dinámicos y notificaciones personalizadas.</p>
                    </div>
                    <div className={style.card}>
                        <div className={style.cardIcon}>🎮</div>
                        <h3>Entretenimiento Integrado</h3>
                        <p>Disfruta de espacios interactivos y contenidos pensados para hacer tu experiencia única diariamente.</p>
                    </div>
                    <div className={style.card}>
                        <div className={style.cardIcon}>🔒</div>
                        <h3>Privacidad & Control</h3>
                        <p>Tus datos e interacciones bajo tu propio control con los estándares de seguridad más exigentes.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action Banner */}
            <section className={style.ctaBanner}>
                <h2>¿Listo para empezar?</h2>
                <p>Únete a miles de usuarios que ya disfrutan de una forma distinta de conectar.</p>
                <Link to="/signup" className={style.btnPrimary}>
                    Registrarme Ahora
                </Link>
            </section>
        </div>
    );
};

export default HomePage;