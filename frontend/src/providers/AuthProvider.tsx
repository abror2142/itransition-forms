import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {User} from "../types/User";
import axios from "../utils/axios";

type AuthProviderProps = PropsWithChildren;

function AuthProvider ({ children }: AuthProviderProps) {
    const [authToken, setAuthToken] = useState<string | null>();
    const [user, setUser] = useState<User | null>();

    // When Application starts/refreshes, I check if the user can be authorized.
    // Refresh token (if there is) will be used to authenticate the user by the backend.
    useEffect(() => {
        const refreshToken = async () => {
            try {
                const resp = await axios.get("/api/token/refresh", {
                    withCredentials: true,
                });
                console.log('refreshed')
                const token  = resp?.data?.token;
                console.log(token); 
                setAuthToken(token);
            } catch {
                setAuthToken(null);
                setUser(null);
            }
        }
        refreshToken();
    }, [])

    const fetchUser = async () => {
        const url = '/api/user'
        try {
            const resp = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                }
            });
            
            setUser({
                id: resp.data?.id,
                email: resp.data?.email,
                roles: resp.data?.roles
            })

        } catch {
            setAuthToken(null);
            setUser(null);
        }
    }

    // Big Logic :)`
    const handleLogin = async (value: string) => {
        try{
            const resp = await axios.post("/auth", value, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const token = resp.data?.token;
            if(token != null) {
                setAuthToken(token)
            }
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(authToken){
            fetchUser()
        }
    }, [authToken])

    const handleLogout = async () => {

    }

    return (
        <AuthContext.Provider value={{ authToken, user, handleLogin, handleLogout }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;