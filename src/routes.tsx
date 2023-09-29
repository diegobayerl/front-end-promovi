import { Route, Routes, BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext";

import Home from "./pages/home";
import SignIn from "./pages/signIn";
import Schedula from "./pages/schedula";
import History from "./pages/history";
import Start from "./pages/start";

export default function Router() {
   
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<SignIn />} path="/"/>
                    <Route element={<Home/>} path="/home"/>
                    <Route element={<Schedula/>} path="/schedula"/>
                    <Route element={<History/>} path="/history"/>
                    <Route element={<Start/>} path="/start"/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}