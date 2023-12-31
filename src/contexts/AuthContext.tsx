import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';
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

export function SignOut(){
    localStorage.removeItem("auth.token");
    localStorage.removeItem("auth.refresh_token");
    localStorage.removeItem("auth.user_id");
    localStorage.removeItem('name.company');
    localStorage.removeItem('id.company');
}

export function AuthProvider({children}: AuthProviderProps){

    const [user, setUser] = useState<User>();
    const navigate = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem('auth.user_id');
       
        if(!!id){
            api.get(`/user/${id}`).then(resonse => {
                setUser(resonse.data);
            });

            api.get(`/company/employee/${id}`).then(response => {
                localStorage.setItem('id.company', response.data.company.id)
                localStorage.setItem('name.company', response.data.company.name)
            });
        } else {
            navigate('/');
        }

    }, []);  

    const isAthenticated = !!localStorage.getItem('auth.user_id');

    async function signIn({email, password}: Data){

        try {
            const response = await api.post('session', {
                email,
                password,
            })
                      
            const Employ = await api.get(`/company/employee/${response.data.user.id}`);
            
            localStorage.setItem("auth.token", response.data.token);
            
            localStorage.setItem("auth.refresh_token", response.data.refresh_token);
            
            localStorage.setItem("auth.user_id", response.data.user.id);
            
            setUser(response.data.user);
            
            api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

            console.log(Employ);
            navigate("/home")
            
        } catch (err) {
            window.alert("Email/Senha incorreto!")
        }
    }

    return (
        <AuthContext.Provider value={{isAthenticated, signIn, user}}>
            {children}
        </AuthContext.Provider>
    )
}