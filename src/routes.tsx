
import { Route, Routes, BrowserRouter } from "react-router-dom"

import Home from "./pages/home";
import SignIn from "./pages/signIn";
import { AuthProvider } from "./contexts/AuthContext";

export default function Router() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<SignIn />} path="/"/>
                    <Route element={<Home/>} path="/home"/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}