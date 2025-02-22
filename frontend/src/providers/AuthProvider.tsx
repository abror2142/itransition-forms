import { PropsWithChildren, useLayoutEffect, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { User } from "../types/User";
import { getUser, login, logout, refreshToken } from "../utils/api";

type AuthProviderProps = PropsWithChildren;

function AuthProvider ({ children }: AuthProviderProps) {
    const [authToken, setAuthToken] = useState<string | null>();
    const [user, setUser] = useState<User | null>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (value: string) => {
        try{
            const resp = await login(value);
            const token = resp.data?.token;
            if(token != null) {
                setAuthToken(token)
            }
        } catch(e) {
            console.log(e);
        }
    }

    const fetchUser = async () => {
        if(authToken){
            try {
                const resp = await getUser(authToken);
                setUser({
                    id: resp.data?.id,
                    fullName: resp.data?.fullName,
                    roles: resp.data?.roles
                })
            } catch {
                setAuthToken(null);
                setUser(null);
            }
        }
    }

    const handleLogout = async () => {
        try {
            await logout();
        } catch(e) {
            console.log(e)
        }finally{
            setAuthToken(null);
            setUser(null); 
        }
    }

    // When Application starts/refreshes, I check if the user can be authorized.
    // Refresh token (if there is) will be used to authenticate the user by the backend.
    useLayoutEffect(() => {
        const refresh = async () => {
            try {
                setLoading(true);
                const resp = await refreshToken();
                const token  = resp?.data?.token;
                setAuthToken(token);
            } catch {
                setAuthToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        refresh();
    }, [])

    useEffect(() => {
        if(authToken){
            fetchUser()
        }
    }, [authToken])

    if(loading)
        return <div>Loading...</div>

    return (
        <AuthContext.Provider value={{ authToken, user, handleLogin, handleLogout }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;