import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { api } from "../services/api";

interface User {
    id: string;
    name: string;
    email: string;
}
interface Data {
    email: string;
    password: string;
}

interface AuthContextData {
    signIn(data: Data): Promise<void>;
    isAthenticated: boolean;
    user?: User;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps){

    const navigate = useNavigate();

    const [user, setUser] = useState<User>();

    useEffect(()=> {
        const id = localStorage.getItem("auth.user_id");

        api.get(`/user/${id}`).then(response => {
            setUser(response.data);
        })

    },[])

    const isAthenticated = !!user;

    async function signIn({email, password}: Data){

        try {
            const response = await api.post('session', {
                email,
                password,
            });

            console.log(response.data)

            localStorage.setItem("auth.token", response.data.token);
            localStorage.setItem("auth.refresh_token", response.data.refresh_token);
            localStorage.setItem("auth.user_id", response.data.user.id);

            setUser(response.data.user);

            api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`

            navigate("/home")
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{isAthenticated, signIn, user}}>
            {children}
        </AuthContext.Provider>
    )
}