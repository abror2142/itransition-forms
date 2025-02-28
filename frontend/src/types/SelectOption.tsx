export type SelectOption = {
    id: number;
    name: string;
}

export type SelectOptionUser = {
    id: number;
    fullName: string;
    email: string;
}

export type SelectOptionCreatable = {
    id: number | string;
    name: string;
    __isNew__?: boolean;
}
