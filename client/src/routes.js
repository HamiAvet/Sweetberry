import React from "react";
import {Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage"
import AuthPage from "./pages/AuthPage/AuthPage"
import ConfigPage from "./pages/ConfigPage/ConfigPage"
import CartPage from "./pages/CartPage/CartPage"
import InvoicePage from "./pages/InvoicePage/InvoicePage"
import MyAccountPage from "./pages/MyAccountPage/MyAccountPage";
import EditInfoPage from "./pages/EditInfoPage/EditInfoPage";
import EditPasswordPage from "./pages/EditPasswordPage/EditPasswordPage";

export const useRoutes = (isLogin, currentPath) => {
    if (isLogin && currentPath === "/configuration") {
        return (
            <Routes>
                <Route path="*" exact element={<ConfigPage />} />
            </Routes>
        );
    }

    if (isLogin && currentPath === "/cart") {
        return (
            <Routes>
                <Route path="*" exact element={<CartPage />} />
            </Routes>
        );
    }

    if (isLogin && currentPath === "/myaccount") {
        return (
            <Routes>
                <Route path="*" exact element={<MyAccountPage />} />
            </Routes>
        );
    }

    if (isLogin && currentPath === "/editinformation") {
        return (
            <Routes>
                <Route path="*" exact element={<EditInfoPage />} />
            </Routes>
        );
    }

    if (isLogin && currentPath === "/changepassword") {
        return (
            <Routes>
                <Route path="*" exact element={<EditPasswordPage />} />
            </Routes>
        );
    }

    if (isLogin && currentPath.startsWith("/invoice")) {
        
        return (
            <Routes>
                <Route path="*" exact element={<InvoicePage />} />
            </Routes>
        );
    }

    if (isLogin || (!isLogin && (currentPath === "/"))) {
        return (
            <Routes>
                <Route path="*" exact element={<MainPage />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="*" exact element={<AuthPage />} />
        </Routes>
    );
}