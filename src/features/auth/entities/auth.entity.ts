export type User = {
    phone: string;
    fullname: string;
    password: string;
    id: string;
}

export type userViewDTO = Omit<User,'password'>;
export type userCreateDTO = Omit<User,'id'>;