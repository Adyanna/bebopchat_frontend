import type { 
    ProfileResponse, 
    ProfileCreateDTO, 
    ProfileUpdateDTO 
} from "../entities/profile.entity";

const url = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/profile`;

// Helper para enviar los headers con el Bearer Token almacenado
const getHeaders = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token") || "";
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

// GET: Obtener el perfil del usuario autenticado
export async function getProfile(): Promise<ProfileResponse> {
    try {
        const response = await fetch(`${url}/`, {
            method: 'GET',
            headers: getHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.errors?.join('\n') ||
                data.message ||
                'Error al obtener el perfil'
            );
        }

        return data;
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error
                ? error.message
                : 'Error en la obtención del perfil'
        );
    }
}

// POST: Crear perfil
export async function createProfile(profileData: ProfileCreateDTO): Promise<ProfileResponse> {
    try {
        const response = await fetch(`${url}/`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(profileData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.errors?.join('\n') ||
                data.message ||
                'Error al crear el perfil'
            );
        }

        return data;
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error
                ? error.message
                : 'Error en la creación del perfil'
        );
    }
}

// PUT: Actualizar perfil existente
export async function updateProfile(profileData: ProfileUpdateDTO): Promise<ProfileResponse> {
    try {
        const response = await fetch(`${url}/`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(profileData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.errors?.join('\n') ||
                data.message ||
                'Error al actualizar el perfil'
            );
        }

        return data;
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error
                ? error.message
                : 'Error en la actualización del perfil'
        );
    }
}

// DELETE: Eliminar perfil
export async function deleteProfile(): Promise<{ message: string }> {
    try {
        const response = await fetch(`${url}/`, {
            method: 'DELETE',
            headers: getHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.errors?.join('\n') ||
                data.message ||
                'Error al eliminar el perfil'
            );
        }

        return data;
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error
                ? error.message
                : 'Error al eliminar el perfil'
        );
    }
}