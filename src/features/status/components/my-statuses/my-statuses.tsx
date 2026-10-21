
import { useEffect, useState } from 'react';
import { statusService } from '@features/status/services/status.service';
import type { MyStatus } from '@features/status/entities/status.entity';
import StatusCard from '@features/status/components/status-card/status-card';
import styles from './my-statuses.module.css';

interface MyStatusesProps {
    refreshKey: number;
}


const MyStatuses = ({ refreshKey }: MyStatusesProps) => {
    const [statuses, setStatuses] = useState<MyStatus[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadStatuses = async () => {
            try {
                const response = await statusService.getMyStatuses();
                setStatuses(response.data as MyStatus[]);
            } catch {
                setError('No se pudieron cargar tus estados.');
            } finally {
                setLoading(false);
            }
        };

        loadStatuses();
    }, [refreshKey]);

    if (loading) {
        return <p className={styles.message}>Cargando tus estados...</p>;
    }

    if (error) {
        return <p className={styles.error}>{error}</p>;
    }

    return (
        <div className={styles.myStatuses}>
            {statuses.length === 0 ? (
                <p className={styles.message}>
                    Todavía no has publicado ningún estado.
                </p>
            ) : (
                statuses.map((status) => (
                    <StatusCard key={status.id} status={status} registerView={false} />
                ))
            )}
        </div>
    );
};

export default MyStatuses;
