import { ContactList } from "../components/contact-list/contact-list";
import "./contacts-page.css";

export default function ContactsPage() {
    return (
        <main className="contacts-page">
            <header className="contacts-page__header">
                <span className="contacts-page__eyebrow">
                    BEBOP // CREW DATABASE
                </span>

                <h1 className="contacts-page__title">Contactos</h1>

                <p className="contacts-page__subtitle">
                    Tu gente. Tu tripulación.
                </p>
            </header>

            <div className="contacts-page__search">
                <span className="contacts-page__search-icon" aria-hidden="true">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                    >
                        <circle cx="10.5" cy="10.5" r="6.5" />
                        <path d="m16 16 4 4" />
                    </svg>
                </span>

                <input
                    className="contacts-page__search-input"
                    type="search"
                    placeholder="Buscar en tu tripulación..."
                    aria-label="Buscar contactos"
                />

                <span className="contacts-page__search-tag">SEARCH</span>
            </div>

            <section className="contacts-page__content">
                <div className="contacts-page__section-header">
                    <h2 className="contacts-page__section-title">
                        DIRECTORIO
                    </h2>

                    <span className="contacts-page__section-label">
                        CONTACTS DATABASE
                    </span>
                </div>

                <ContactList />
            </section>
        </main>
    );
}