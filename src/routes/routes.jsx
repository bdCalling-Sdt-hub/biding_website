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
import UpcomingAuction from "../pages/UpcomingAuction/UpcomingAuction";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Payment from "../pages/Payment/Payment";
import BuyBids from "../pages/BuyBids/BuyBids";
import AccountLayout from "../components/layouts/AccountLayout";
import MyProfile from "../pages/MyAccountPages/MyProfile.jsx";
import AddressBook from "../pages/MyAccountPages/AddressBook.jsx";
import ChangePassword from "../pages/MyAccountPages/ChangePassword.jsx";
import MyOrder from "../pages/MyAccountPages/MyOrder.jsx";
import Bookmarks from "../pages/MyAccountPages/Bookmarks.jsx";
import BiddingHistory from "../pages/MyAccountPages/BiddingHistory.jsx";
import MyBids from "../pages/MyAccountPages/MyBids.jsx";
import EditProfile from "../pages/MyAccountPages/EditProfile.jsx";
import EditAddAddress from "../components/ui/EditAddAddress.jsx";
import TrackOrder from "../pages/MyAccountPages/TrackOrder.jsx";
import AdminLogin from "../pages/DahsboardPages/AdminLogin.jsx";
import AdminForgetPassword from "../pages/DahsboardPages/AdminForgetPassword.jsx";
import AdminVerificationCode from "../pages/DahsboardPages/AdminVerificationCode.jsx";
import AdminResetPassword from "../pages/DahsboardPages/AdminResetPassword.jsx";
import DashboardLayout from "../components/layouts/DashboardLayout.jsx";
import DashboardHome from "../pages/DahsboardPages/DashboardHome.jsx";
import AuctionManagment from "../pages/DahsboardPages/AuctionManagment.jsx";
import ActiveAuctionPage from "../pages/DahsboardPages/ActiveAuctionPage.jsx";
import OrderManagment from "../pages/DahsboardPages/OrderManagment.jsx";
import UserManagement from "../pages/DahsboardPages/UserManagement.jsx";
import Profile from "../pages/DahsboardPages/Profile.jsx";
import Aboutus from "../pages/DahsboardPages/Aboutus.jsx";
import DashboardTipsAndTricks from "../pages/DahsboardPages/DashboardTipsAndTricks.jsx";
import DashboardFaqs from "../pages/DahsboardPages/DashboardFaqs.jsx";
import DashboardPrivacyAndPolicy from "../pages/DahsboardPages/DashboardPrivacyAndPolicy.jsx";
import DashboardTermsAndCondition from "../pages/DahsboardPages/DashboardTermsAndCondition.jsx";
import DashboardAccessibility from "../pages/DahsboardPages/DashboardAccessibility.jsx";
import Transaction from "../pages/DahsboardPages/Transaction.jsx";
import DashboardNotification from "../pages/DahsboardPages/DashboardNotification.jsx";
import CategoryAndBanner from "../pages/DahsboardPages/CategoryAndBanner.jsx";
import Auctions from "../pages/Auctions/Auctions.jsx";

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
                path: '/winner',
                element: <Winner />
            },
            {
                path: '/notification',
                element: <Notification />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/auctions',
                element: <Auctions />
            },
            {
                path: '/terms-and-condition',
                element: <TermsAndCondition />
            },
            {
                path: '/privacy-policy',
                element: <PrivacyAndPolicy />
            },
            {
                path: '/faqs',
                element: <Faqs />
            },
            {
                path: '/tips-and-tricks',
                element: <TipsAndTricks />
            },
            {
                path: '/accessibility',
                element: <Accessibility />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/help',
                element: <Help />
            },
            {
                path: '/upcoming-auction',
                element: <UpcomingAuction />
            },
            {
                path: '/product-details/:id',
                element: <ProductDetails />
            },
            {
                path: '/payment',
                element: <Payment />
            },
            {
                path: '/buy-bids',
                element: <BuyBids />
            },
        ]
    },
    {
        path: '/admin',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardHome />
            },
            {
                path: 'autction-managment',
                element: <AuctionManagment />
            },
            {
                path: 'active-auction',
                element: <ActiveAuctionPage />
            },
            {
                path: 'order-managment',
                element: <OrderManagment />
            },
            {
                path: 'user-managment',
                element: <UserManagement />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'about-us',
                element: <Aboutus />
            },
            {
                path: 'tips-tricks',
                element: <DashboardTipsAndTricks />
            },
            {
                path: 'faqs',
                element: <DashboardFaqs />
            },
            {
                path: 'privacy-policy',
                element: <DashboardPrivacyAndPolicy />
            },
            {
                path: 'terms-condition',
                element: <DashboardTermsAndCondition />
            },
            {
                path: 'accessibility',
                element: <DashboardAccessibility />
            },
            {
                path: 'transaction',
                element: <Transaction />
            },
            {
                path: 'notification',
                element: <DashboardNotification />
            },
            {
                path: 'category-banner',
                element: <CategoryAndBanner />
            },

        ]
    },
    {
        path: '/my-profile',
        element: <AccountLayout />,
        children: [
            {
                index: true,
                element: <MyProfile />
            },
            {
                path: 'address-book',
                element: <AddressBook />
            },
            {
                path: 'change-password',
                element: <ChangePassword />
            },
            {
                path: 'my-order',
                element: <MyOrder />
            },
            {
                path: 'bookmarks',
                element: <Bookmarks />
            },
            {
                path: 'bidding-history',
                element: <BiddingHistory />
            },
            {
                path: 'my-bids',
                element: <MyBids />
            },
            {
                path: 'edit-profile',
                element: <EditProfile />
            },
            {
                path: 'edit-address',
                element: <EditAddAddress />
            },
            {
                path: 'track-order/:id',
                element: <TrackOrder />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/admin-login',
        element: <AdminLogin />
    },
    {
        path: '/admin-forget-password',
        element: <AdminForgetPassword />
    },
    {
        path: '/admin-verification-code',
        element: <AdminVerificationCode />
    },
    {
        path: '/admin-reset-password',
        element: <AdminResetPassword />
    },
    {
        path: '/admin-reset-password',
        element: <AdminLogin />
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