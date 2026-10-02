import { useNavigate } from "react-router";
import { useState } from "react";
import { SigninForm } from "@features/auth/components/singin-form/signin-form";
import { signinUser } from "@features/auth/services/auth.service";

const LoginPage = () => {

    const navegate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async (phone: string, password: string, remember: boolean) => {
        setError("");
        try {
            const token = await signinUser(phone, password);
            console.log('TOKEN SERVICIO:', token,)
            if (remember) {
                localStorage.setItem("token", token);
            }
            else {
                sessionStorage.setItem('token', token)
            }
            // COLOCAR NAVEGACION A LA PAGINA PRINCIPAL
            navegate("/");
        } catch (error: unknown) {
            setError('Usuario o contraseña incorrectos');
            throw new Error(error instanceof Error ? error.message : 'Error en la obtencion de datos');
        }
    };

    return <SigninForm onLogin={handleLogin} error={error} />;
};

export default LoginPage