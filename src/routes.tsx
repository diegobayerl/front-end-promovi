import { Route, Routes, BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext";

import Home from "./pages/home";
import SignIn from "./pages/signIn";
import Schedulas from "./pages/schedula";
import History from "./pages/history";
import Start from "./pages/start";
import Finish from "./pages/finish";
import AddSales from "./pages/addSales";
import Details from "./pages/detailsAddSales";
import Nuntiare from "./pages/nuntiare";
import CreateSchedula from "./pages/createSchedula";
import SignUp from "./pages/signUp";

export default function Router() {
   
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<SignIn />} path="/"/>
                    <Route element={<SignUp/>} path="/signUp"/>
                    <Route element={<Home/>} path="/home"/>
                    <Route element={<Schedulas/>} path="/schedula"/>
                    <Route element={<History/>} path="/history"/>
                    <Route element={<Start/>} path="/start"/>
                    <Route element={<Finish/>} path="/finish"/>
                    <Route element={<AddSales/>} path="/sales"/>
                    <Route element={<Details/>} path="/sales/:id"/>
                    <Route element={<Nuntiare/>} path="/nuntiare"/>
                    <Route element={<CreateSchedula/>} path="/schedula/create"/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}