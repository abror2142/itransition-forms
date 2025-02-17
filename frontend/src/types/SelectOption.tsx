export type SelectOption = {
    id: number;
    name: string;
}

export type SelectOptionUser = {
    id: number;
    email: string;
}

export type SelectOptionCreatable = {
    id: number | null;
    name: string;
    __isNew__?: boolean;
}
