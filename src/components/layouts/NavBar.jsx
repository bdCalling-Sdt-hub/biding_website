import { Badge, Button, Drawer, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import LeftMenu from '../ui/LeftMenu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { LuUserCircle2 } from 'react-icons/lu';
import { IoMenuOutline } from 'react-icons/io5';
import { useSocketContext } from '../../Providers/SocketProviders';
import { useReadNotificationMutation } from '../../redux/api/manageApis';
import { useGetProfileQuery } from '../../redux/api/authApis';
import logo from '../../assets/logo.png'
const NavBar = () => {
  const navigate = useNavigate()
  const { data } = useGetProfileQuery()
  const { data: profile } = useGetProfileQuery();
  const { newNotifications } = useSocketContext()
  const [readNotification] = useReadNotificationMutation()
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  let { pathname: location } = useLocation();
  useEffect(() => {
    setVisible(false);
  }, [location])
  return (
    <nav className="navbar ">
      <Layout className='max-w-screen-2xl mx-auto'>
        <Layout.Header className="nav-header">
          <Link to={`/`} className="logo hover:text-yellow">
            {/* <h3 className="brand-font font-bold text-[25px] mt-3 pl-1 md:pl-0 ">Bidding Website</h3> */}
            <img src={logo} alt="" />
          </Link>
          <div className="navbar-menu">
            <div className="leftMenu flex justify-between items-center gap-5 w-full">
              <div className='flex justify-between items-center gap-5 pl-10 mt-2'>
                <Link className={`${location === '/' ? "text-yellow border-b" : ""} hover:text-yellow `} to='/'>Home</Link>
                <Link className={`${location === '/winner' ? "text-yellow border-b" : ""} hover:text-yellow `} to='/winner'>Winner</Link>
                <Link className={`${location === '/help' ? "text-yellow border-b" : ""} hover:text-yellow `} to='/help'>Help</Link>
                <Link className={`${location === '/contact' ? "text-yellow border-b" : ""} hover:text-yellow `} to='/contact'>Contact</Link>

              </div>
              {
                profile?.data?.email ? <div className='flex items-center gap-4 mt-2'>
                  <Badge className='' count={newNotifications || 0}>
                    <Link onClick={() => readNotification()} to='/notification'  >
                      <IoIosNotificationsOutline size={22} className='text-yellow' />
                    </Link>

                  </Badge>
                  <div className='bg-[#FEF6e7] rounded-full p-2'>
                    <Link to='/my-profile'><LuUserCircle2 size={22} className='text-yellow' /></Link>
                  </div>

                </div> : <>
                  <div className='flex justify-center items-center mt-2 gap-5'>
                    <button style={{
                      padding: '5px 20px'
                    }} onClick={() => {
                      navigate('/register')
                    }} className='border-yellow hover:text-yellow border text-yellow  rounded-md'>
                      Get Started
                    </button>
                    <button style={{
                      padding: '5px 20px'
                    }} onClick={() => {
                      navigate('/login')
                    }} className='bg-yellow border-yellow border text-white rounded-md'>
                      Sign in
                    </button>
                  </div>
                </>
              }
            </div>
            <Button className="menuButton" type="text" onClick={showDrawer}>
              <IoMenuOutline size={21} className='text-yellow' />
            </Button>
            {/* <div className="rightMenu">
              <RightMenu mode={"horizontal"} />
            </div> */}

            <Drawer
              title={"Brand Here"}
              placement="right"
              closable={true}
              onClose={showDrawer}
              visible={visible}
              style={{ zIndex: 99999 }}
            >
              <div className='mt-4'>
                <div className='flex items-center gap-2'>
                  <img className='h-10 w-10 rounded-full' src={data?.data?.profile_image} alt="" />
                  <div>
                    <p className='font-semibold'>{data?.data?.name}</p>
                    <p>{data?.data?.email}</p>
                  </div>
                </div>
                <div className='flex items-center justify-center gap-4 mt-5'>
                  <p className='text-[#338BFF] bg-[#F9F9F9] px-4 py-2'>{Number(data?.data?.availableBid || 0).toFixed(2)} Bids</p>
                  <Link to={`/buy-bids`} className='bg-yellow p-2 rounded-md'>Buy Credits</Link>
                </div>
              </div>
              <LeftMenu mode={"inline"} />
              {/* <RightMenu mode={"inline"} /> */}
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
}

export default NavBar;
