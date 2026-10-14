import type { GetMyContactsDTO, GetMyContactsResponseDTO, UserContact } from "@features/contacts/entities/contact.entity";



const API_URL = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
};

export const contactService = {
    // POST /users/me/contacts
    async addContact(userId: number): Promise<UserContact> {
        const response = await fetch(`${API_URL}/users/me/contacts`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                targetId: userId,
            }),

        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error ?? 'Error al agregar contacto');
        }
        // console.log(response.json())
        return await response.json();
    },

    // GET /users/me/contacts
    async getMyContacts(params: GetMyContactsDTO = {}): Promise<GetMyContactsResponseDTO> {
        const query = new URLSearchParams();

        if (params.search) query.set("search", params.search);
        if (params.before) query.set("before", params.before);
        if (params.limit !== undefined) {
            query.set("limit", String(params.limit));
        }

        const response = await fetch(
            `${API_URL}/users/me/contacts?${query.toString()}`,
            {
                method: "GET",
                headers: getAuthHeaders(),
            }
        );

        if (!response.ok) {
            const body = await response.json();

            throw new Error(
                body.message ?? body.errors?.[0] ?? "Error al agregar contacto"
            );
        }

        return response.json();
    },

    // DELETE /users/me/contacts/:UserContactId
    async deleteContact(userContactId: number): Promise<void> {

        const response = await fetch(`${API_URL}/users/me/contacts/${userContactId}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al borrar contacto');
        }
    }
}