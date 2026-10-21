import { useEffect, useState } from 'react';
import { statusService } from '@features/status/services/status.service';
import type { ContactStatus } from '@features/status/entities/status.entity';
import StatusCard from '@features/status/components/status-card/status-card';
import styles from './contacts-statuses.module.css';

const ContactsStatuses = () => {
    const [statuses, setStatuses] = useState<ContactStatus[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadStatuses = async () => {
            try {
                const response = await statusService.getContactStatuses();
                setStatuses(response.data as ContactStatus[]);
            } catch {
                setError('No se pudieron cargar los estados de tus contactos.');
            } finally {
                setLoading(false);
            }
        };

        loadStatuses();
    }, []);

    if (loading) {
        return <p className={styles.message}>Cargando estados de tus contactos...</p>;
    }

    if (error) {
        return <p className={styles.error}>{error}</p>;
    }

    return (
        <section className={styles.contactsStatuses}>
            {statuses.length === 0 ? (
                <p className={styles.message}>
                    Tus contactos todavía no han publicado estados.
                </p>
            ) : (
                statuses.map((status) => (
                    <StatusCard
                        key={status.id}
                        status={status}
                        registerView={true}
                    />
                ))
            )}
        </section>
    );
};

export default ContactsStatuses;