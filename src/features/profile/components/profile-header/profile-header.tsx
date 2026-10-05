import type { ProfileHeaderProps } from "@features/profile/entities/profile.entity"
import styles from "./profile-header.module.css"

export const ProfileHeader = ({ fullname, phone, photoUrl }: ProfileHeaderProps) => {
    const defaultAvatar = "../src/assets/default-bounty-hunter.svg";

    return (
        <header className={styles.headerContainer}>
            {/* Indicador superior estilo Terminal ISSP */}
            <div className={styles.terminalBar}>
                <span>[ REGISTRO DE CAZADOR DE RECOMPENSAS ]</span>
                <span className={styles.statusIndicator}>
                    <span className={styles.pulseDot}></span>
                    SINTONÍA ACTIVA
                </span>
            </div>

            <div className={styles.profileContent}>
                {/* Contenedor de la Foto de Perfil */}
                <div className={styles.avatarWrapper}>
                    <div className={styles.avatarFrame}>
                        <img
                            src={photoUrl || defaultAvatar}
                            alt={`Foto de ${fullname}`}
                            className={styles.avatarImage}
                        />
                    </div>
                    <span className={styles.badge}>
                        ID: OK
                    </span>
                </div>

                {/* Información Principal del Usuario */}
                <div className={styles.userInfo}>
                    <span className={styles.userLabel}>
                        ALIAS / CAZADOR
                    </span>
                    <h1 className={styles.userName}>
                        {fullname}
                    </h1>

                    <div className={styles.phoneDetail}>
                        <span className={styles.freqLabel}>FREQ:</span>
                        <span>+{phone}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}