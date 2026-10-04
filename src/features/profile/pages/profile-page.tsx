import { useState, useEffect } from "react"
import type { NotificactionData } from "@core/types/core-types"
import { Notification } from "@core/components/notification/notification"
import { ProfileHeader } from "@features/profile/components/profile-header/profile-header"
import { ProfileForm } from "@features/profile/components/profile-form/profile-form"
import { ProfileFooter } from "@features/profile/components/profile-footer/profile-footer"
import { getProfile, createProfile, updateProfile } from "@features/profile/services/profile.service"
import type { UserProfileData, ProfileUpdateDTO } from "@features/profile/entities/profile.entity"
import styles from "./profile-page.module.css"

const ProfilePage = () => {
    const [userData, setUserData] = useState<UserProfileData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [notification, setNotification] = useState<NotificactionData | null>(null);

    // Consumir el endpoint GET /profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await getProfile();
                setUserData(response.data);
            } catch (error: unknown) {
                const errorM = error instanceof Error ? error.message : "Error al cargar la ficha del perfil";
                setNotification({
                    title: "Error de Sintonía",
                    message: errorM,
                    type: "error"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Guardar datos (Maneja POST si es perfil nuevo o PUT si ya existe)
    const handleSaveProfile = async (formData: ProfileUpdateDTO) => {
        try {
            let response;

            if (userData?.perfil) {
                response = await updateProfile(formData);
            } else {
                response = await createProfile({
                    photoUrl: formData.photoUrl || "",
                    estadoCivil: formData.estadoCivil || 0,
                    genero: formData.genero || 0,
                    estadoAnimo: formData.estadoAnimo || 0,
                    descripcion: formData.descripcion || ""
                });
            }

            setUserData(response.data);

            setNotification({
                title: "Registro Exitoso",
                message: "Tus datos se han guardado correctamente en la red Bebop.",
                type: "success"
            });
        } catch (error: unknown) {
            const errorM = error instanceof Error ? error.message : "Error al guardar los cambios";
            setNotification({
                title: "Error de Guardado",
                message: errorM,
                type: "error"
            });
        }
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                [ CONECTANDO CON EL ARCHIVO DE LA ISSP... ]
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            {userData && (
                <>
                    <ProfileHeader
                        fullname={userData.fullname}
                        phone={userData.phone}
                        photoUrl={userData.perfil?.photoUrl}
                    />

                    <main className={styles.mainContent}>
                        <ProfileForm
                            initialData={userData.perfil ?? undefined}
                            onSave={handleSaveProfile}
                        />
                    </main>
                </>
            )}

            <ProfileFooter />

            {notification && (
                <Notification
                    title={notification.title}
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
};

export default ProfilePage;