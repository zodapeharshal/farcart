import logo from "./logo.svg";
import "./App.css";
import LoginComp from "./components/Login/LoginComp";
import SignupPage from "./components/Login/SignupPage";
import DashboardComp from "./components/Dashboard/DashboardComp";
import { Route, Routes, Navigate } from "react-router-dom";
import PdfViewer from "./components/PdfViewer/PdfViewer";
import { useContext } from "react";
import { useGetUser } from "./components/context/UserContext";
import { UserContext } from "./components/context/UserContext";
import Navigation from "./components/Navigation";
import { useState } from "react";
function App() {
    const [userData, setUserData] = useState({});
    return (
        <UserContext.Provider value={[userData, setUserData]}>
            <Navigation />
        </UserContext.Provider>
    );
}

export default App;
