

export interface Contact {
    contactId: number;
    userContactId: number;
    phone: string,
    fullname: string;
    profilePicture: string;
}


export interface UserContact {
    id: number;
    fullname: string;
    phone: string;
}

export interface GetMyContactsDTO {
    search?: string;
    before?: string;
    limit?: number;
};

export interface GetMyContactsResponseDTO {
    data: Contact[];
    hasMore: boolean;
    meta: {
        limit: number;
        nextBefore: string | null;
    }
}