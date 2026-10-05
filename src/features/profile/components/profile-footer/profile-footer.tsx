import styles from "./profile-footer.module.css"

export const ProfileFooter = () => {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerContent}>
                {/* Info del Sistema / Serie */}
                <div className={styles.brandSection}>
                    <span className={styles.systemTitle}>BEBOP NET // ISSP DATABASE</span>
                    <span className={styles.copyright}>
                        © 2026 BEBOP PROJECT - SEE YOU SPACE COWBOY...
                    </span>
                </div>

                {/* Créditos del Desarrollador */}
                <div className={styles.creditsSection}>
                    <span>DESARROLLADO POR:</span>
                    <span className={styles.devBadge}>HUNTER DEV</span>
                </div>
            </div>
        </footer>
    );
};