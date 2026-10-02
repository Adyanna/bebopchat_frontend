import type { userViewDTO, userCreateDTO } from "../entities/auth.entity";

const url = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/auth`;


export async function signinUser(phone: string, password: string) {

    try {
        const response = await fetch(`${url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone, password })
        });

        const data = await response.json();

        if (!response.ok) {
               throw new Error(
                data.errors?.join('\n') ||
                data.message ||
                'Error al iniciar sesión'
            );
        }
        

        return data.token;

    } catch (error: unknown) {
        throw new Error(
            error instanceof Error
                ? error.message
                : 'Error en la obtencion de datos'
        );
    }
}


/*
export async function getMe(token: string): Promise<userViewDTO> {
    try {

        const response = await fetch(`${url}/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(response);
            throw new Error(
                'Error al obtener el usuario. Por favor, inténtalo de nuevo.'
            );
        }

        return data;

    } catch (error: unknown) {
        throw new Error(
            error instanceof Error
                ? error.message
                : 'Error en la obtencion de datos'
        );
    }
}
*/

export async function registerUser(user: userCreateDTO): Promise<userViewDTO> {
    try {
        console.log("registerUser", user);
        console.log("url", url);
        const data = await fetch(`${url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        console.log(data);

        if (!data.ok) {
           const error = await data.json();

            throw new Error(
                error.errors?.join('\n') || "Error en la creación del usuario"
            );
        }

        return data.json();

    } catch (error: unknown) {
        throw new Error(
            error instanceof Error
                ? error.message
                : "Error en la conexion."
        );
    }
}