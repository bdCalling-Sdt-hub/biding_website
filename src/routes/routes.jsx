import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import VerificationCode from "../pages/VerificationCode/VerificationCode";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/forget-password',
        element: <ForgetPassword />
    },
    {
        path: '/verification-code',
        element: <VerificationCode />
    },
    {
        path: '/reset-password',
        element: <ResetPassword />
    },
])

export default router