import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import VerificationCode from "../pages/VerificationCode/VerificationCode";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Winner from "../pages/Winner/Winner";
import Notification from "../pages/Notification/Notification";
import About from "../pages/FooterPages/About";
import TermsAndCondition from "../pages/FooterPages/TermsAndCondition";
import PrivacyAndPolicy from "../pages/FooterPages/PrivacyAndPolicy";
import Faqs from "../pages/FooterPages/Faqs";
import TipsAndTricks from "../pages/FooterPages/TipsAndTricks";
import Accessibility from "../pages/FooterPages/Accessibility";
import Contact from "../pages/Contact/Contact";
import Help from "../pages/Help/Help";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path : '/winner',
                element: <Winner />
            },
            {
                path : '/notification',
                element: <Notification />
            },
            {
                path : '/about',
                element: <About />
            },
            {
                path : '/terms-and-condition',
                element: <TermsAndCondition />
            },
            {
                path : '/privacy-policy',
                element: <PrivacyAndPolicy />
            },
            {
                path : '/faqs',
                element: <Faqs />
            },
            {
                path : '/tips-and-tricks',
                element: <TipsAndTricks />
            },
            {
                path : '/accessibility',
                element: <Accessibility />
            },
            {
                path : '/contact',
                element: <Contact />
            },
            {
                path : '/help',
                element: <Help />
            },
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