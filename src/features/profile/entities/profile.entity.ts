export interface ProfileHeaderProps {
    fullname: string;
    phone: string;
    photoUrl?: string;
}

export interface Perfil {
    id?: number;
    photoUrl: string;
    estadoCivil: number;
    genero: number;
    estadoAnimo: number;
    descripcion: string;
    createdAt?: string;
}

export interface UserProfileData {
    id: number;
    phone: string;
    fullname: string;
    isActive: boolean;
    createdAt: string;
    perfil: Perfil | null;
}

export interface ProfileResponse {
    message: string;
    data: UserProfileData;
}

export type ProfileCreateDTO = Omit<Perfil, "id" | "createdAt">;
export type ProfileUpdateDTO = Partial<ProfileCreateDTO>;