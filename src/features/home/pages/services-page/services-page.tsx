import style from './services-page.module.css';

const Services = () => {
    const servicesList = [
        {
            title: 'Mensajería Instantánea',
            desc: 'Intercambio de mensajes de texto, multimedia e indicadores de estado en tiempo real.',
            tag: 'CORE'
        },
        {
            title: 'Llamadas & Audio',
            desc: 'Llamadas punto a punto optimizadas para baja latencia.',
            tag: 'VOICE'
        },
        {
            title: 'Publicación de Estados',
            desc: 'Comparte actualizaciones temporales con tu red de contactos.',
            tag: 'SOCIAL'
        },
        {
            title: 'Centro de Juegos',
            desc: 'Catálogo de minijuegos integrados para competir con tus amigos.',
            tag: 'GAMING'
        }
    ];

    return (
        <div className={style.servicesContainer}>
            <header className={style.header}>
                <h2>Nuestros Servicios</h2>
                <p>Módulos diseñados para ofrecer una experiencia completa dentro de la plataforma.</p>
            </header>

            <div className={style.grid}>
                {servicesList.map((service, idx) => (
                    <article key={idx} className={style.serviceCard}>
                        <span className={style.tag}>{service.tag}</span>
                        <h3>{service.title}</h3>
                        <p>{service.desc}</p>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Services;