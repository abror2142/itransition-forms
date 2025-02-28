export type User = {
    id: number;
    fullName: string;
    image: string;
    roles: string[];
}

export interface UserFull {
    id: number;
    email: string;
    fullName: string;
    status: string;
    roles: string[];
    isVerified: boolean;
    image: string;
}