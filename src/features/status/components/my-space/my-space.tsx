
import CreateStatusCard from '@features/status/components/create-status-card/create-status-card';
import MyStatuses from '@features/status/components/my-statuses/my-statuses';
import styles from './my-space.module.css';
import { useState } from 'react';

const MySpace = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleStatusCreated = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div className={styles.mySpace}>
            <CreateStatusCard onStatusCreated={handleStatusCreated} />
            <MyStatuses refreshKey={refreshKey} />
        </div>
    );
};

export default MySpace;
