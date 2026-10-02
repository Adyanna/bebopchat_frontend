import styles from './notificacion.module.css'
import { useEffect } from 'react';
import type { NotificactionData } from '@core/types/core-types';

interface Props extends NotificactionData {
    onClose: () => void;
}

export const Notification: React.FC<Props> = ({ title, message, type, onClose }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);

    }, [onClose]);

    return (
        <>
            <div className={`${styles.notification} ${type === "success" ? styles.success : styles.error}`}>
                <button className={styles.close} onClick={onClose}>✕</button>
                <h4>{title}</h4>
                <p>{message}</p>
            </div>
        </>
    )
}