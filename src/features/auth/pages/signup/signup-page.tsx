import { useNavigate } from "react-router"
import { useState } from "react"
import type { userCreateDTO } from "@features/auth/entities/auth.entity"
import { registerUser } from "@features/auth/services/auth.service"
import type { NotificactionData } from "@core/types/core-types"
import { Notification } from "@core/components/notification/notification"
import { SignupForm } from "@features/auth/components/signup-form/signup-form"


const SignupPage = () => {
    const [notification, setNotificacion] = useState<NotificactionData | null>(null);
    const navigate = useNavigate();

    const handleSignin = async (user: userCreateDTO) => {
        try {
            await registerUser(user);
            setNotificacion({
                title: "Creacion de Usuario",
                message: "Usuario creado correctamente",
                type: "success"
            })
            setTimeout(() => {
                navigate("/login");
            }, 3000);

        } catch (error: unknown) {
            const errorM = error instanceof Error ? error.message : "Error en la creacion de usuario";
            setNotificacion({
                title: "Error",
                message: errorM,
                type: "error"
            }
            );
        }

    }

    return (
        <>
            <SignupForm onCreate={handleSignin} />
            {notification && <Notification title={notification?.title} message={notification.message} type={notification.type} onClose={() => setNotificacion(null)} />}
        </>
    )
}
export default SignupPage