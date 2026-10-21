export type StatusType = 1 | 2 | 3;

export interface Status {
  id: number;
  userId: number;
  content: string;
  type: StatusType;
  isActive: boolean;
  createdAt: string;
}

export interface MyStatus extends Status {
  _count: {
    views: number;
  };
}

export interface ContactStatus extends Status {
  user: {
    id: number;
    fullname: string;
    perfil: {
      photoUrl: string | null;
    } | null;
  };
}

export interface CreateStatusDTO {
  content: string;
  type: StatusType;
}

export interface StatusResponse {
  message: string;
  data: Status;
}

export interface StatusesResponse {
  message: string;
  data: Status[];
}