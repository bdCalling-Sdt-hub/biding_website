import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import BackButton from '../ui/BackButton'
import { MdChevronRight } from 'react-icons/md'

import { Tabs } from 'antd'
import AccountMenu from '../ui/AccountMenu'
import DashboardMenu from '../ui/DashboardMenu'
import { useGetProfileQuery } from '../../redux/api/authApis'
import { FaArrowLeft } from 'react-icons/fa'

const AccountLayout = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const { data } = useGetProfileQuery()
    const items = [
        {
            key: '1',
            label: 'Account Mangement',
            children: <AccountMenu />,
        },
        {
            key: '2',
            label: 'My Dashboard',
            children: <DashboardMenu />,
        },

    ];
    return (
        <div>
            <NavBar />
            <div className='bg-[#F9F9F9]'>
                <div className='max-w-screen-2xl mx-auto py-2 grid grid-cols-12 gap-5'>
                    <div className='col-span-12 md:col-span-2'>
                        <BackButton pageName={'My Account'} />

                        {/* Swiper section will be shown on small devices */}
                        <div className="md:hidden">
                            <Tabs defaultActiveKey="1" items={items} />
                        </div>


                        {/* Hide this content on small devices */}
                        <div className='hidden md:block'>
                            <h1 className='text-[22px] font-medium'>Manage your account</h1>
                            <div className='w-full flex flex-col gap-2 text-white mt-5'>
                                <Link to='/my-profile' className={`w-full  px-5 rounded-sm py-1 flex items-center justify-between ${pathname == '/my-profile' ? 'bg-yellow' : "bg-[#FEF6e7] text-[#2E2E2E]"}`}>
                                    My Profile <MdChevronRight size={22} />
                                </Link>
                                <Link to='/my-profile/address-book' className={`w-full  px-5 rounded-sm py-1 flex items-center justify-between ${pathname == '/my-profile/address-book' ? 'bg-yellow' : "bg-[#FEF6e7] text-[#2E2E2E]"}`}>
                                    Address Book <MdChevronRight size={22} />
                                </Link>
                                {
                                    data?.data?.authType !== 'GOOGLE' && <Link to='/my-profile/change-password' className={`w-full  px-5 rounded-sm py-1 flex items-center justify-between ${pathname == '/my-profile/change-password' ? 'bg-yellow' : "bg-[#FEF6e7] text-[#2E2E2E]"}`}>
                                        Change Password <MdChevronRight size={22} />
                                    </Link>
                                }

                            </div>
                            <h1 className='text-[22px] font-medium py-5'>My Dashboard</h1>
                            <div className='w-full flex flex-col gap-2 text-white mt-5'>
                                <Link to='/my-profile/my-order' className={`w-full  px-5 rounded-sm py-1 flex items-center justify-between ${pathname == '/my-profile/my-order' ? 'bg-yellow' : "bg-[#FEF6e7] text-[#2E2E2E]"}`}>
                                    My Order <MdChevronRight size={22} />
                                </Link>
                                <Link to='/my-profile/bookmarks' className={`w-full  px-5 rounded-sm py-1 flex items-center justify-between ${pathname == '/my-profile/bookmarks' ? 'bg-yellow' : "bg-[#FEF6e7] text-[#2E2E2E]"}`}>
                                    Bookmarks <MdChevronRight size={22} />
                                </Link>
                                <Link to='/my-profile/bidding-history' className={`w-full  px-5 rounded-sm py-1 flex items-center justify-between ${pathname == '/my-profile/bidding-history' ? 'bg-yellow' : "bg-[#FEF6e7] text-[#2E2E2E]"}`}>
                                    Bidding History <MdChevronRight size={22} />
                                </Link>
                                <Link to='/my-profile/my-bids' className={`w-full  px-5 rounded-sm py-1 flex items-center justify-between ${pathname == '/my-profile/my-bids' ? 'bg-yellow' : "bg-[#FEF6e7] text-[#2E2E2E]"}`}>
                                    My Bids <MdChevronRight size={22} />
                                </Link>
                                
                                <Link to='/my-profile/financial-payment' className={`w-full  px-5 rounded-sm py-1 flex items-center justify-between ${pathname == '/my-profile/financial-payment' ? 'bg-yellow' : "bg-[#FEF6e7] text-[#2E2E2E]"}`}>
                                    Financial Payment <MdChevronRight size={22} />
                                </Link>
                                <button onClick={() => {
                                    localStorage.removeItem('token')
                                    navigate('/')
                                    window.location.reload()
                                }} className={`w-full  px-5 rounded-sm py-1 flex items-center justify-between bg-[#FEF6e7] text-[#2E2E2E]`}>
                                    Logout <MdChevronRight size={22} />
                                </button>

                            </div>
                        </div>
                    </div>
                    <div className='col-span-12 md:col-span-10 mt-10 bg-white rounded-md p-8 mb-5 mx-2 lg:mx-0'>
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AccountLayout;
