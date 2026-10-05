import { createContext, useEffect, useState } from "react";
import type { UserProfileData } from "@features/profile/entities/profile.entity";
import { getProfile } from "@features/profile/services/profile.service";

type UserProviderProps = {
    children: React.ReactNode;
};

type UserContextType = {
    userData: UserProfileData | null;
    setUserData: React.Dispatch<
        React.SetStateAction<UserProfileData | null>
    >;
    loading: boolean;
    error: string | null;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: UserProviderProps) {
    const [userData, setUserData] = useState<UserProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const token =
                localStorage.getItem("token") ||
                sessionStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await getProfile();
                setUserData(response.data);
            } catch (error: unknown) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "Error al cargar el perfil";

                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                userData,
                setUserData,
                loading,
                error,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;