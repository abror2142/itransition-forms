import { createContext } from "react";
import { User } from "../types/User";

type AuthContext = {
    authToken?: string | null;
    user?: User | null;
    handleLogin: (values: string) => Promise<void>;
    handleLogout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);