import { Button, Drawer, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import LeftMenu from '../ui/LeftMenu';
import { Link, useLocation } from 'react-router-dom';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { LuUserCircle2 } from 'react-icons/lu';
import { IoMenuOutline } from 'react-icons/io5';
import img from '../../assets/user.png'

const NavBar = () => {
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
          <div className="logo">
            <h3 className="brand-font font-bold text-[25px] mt-3 pl-1 md:pl-0 ">Biding Website</h3>
          </div>
          <div className="navbar-menu">
            <div className="leftMenu flex justify-between items-center gap-5 w-full">
              <div className='flex justify-between items-center gap-5 pl-10 mt-2'>
                <Link className={`${location === '/' ? "text-yellow border-b" : ""} hover:text-yellow `} to='/'>Home</Link>
                <Link className={`${location === '/winner' ? "text-yellow border-b" : ""} hover:text-yellow `} to='/winner'>Winner</Link>
                <Link className={`${location === '/help' ? "text-yellow border-b" : ""} hover:text-yellow `} to='/help'>Help</Link>
                <Link className={`${location === '/contact' ? "text-yellow border-b" : ""} hover:text-yellow `} to='/contact'>Contact</Link>

              </div>
              <div className='flex items-center gap-2 mt-2'>
                <Link to='/notification' className='bg-[#FEF6e7] rounded-full p-2'>
                  <IoIosNotificationsOutline size={22} className='text-yellow' />
                </Link>
                <div className='bg-[#FEF6e7] rounded-full p-2'>
                  <LuUserCircle2 size={22} className='text-yellow' />
                </div>

              </div>
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
                  <img src={img} alt="" />
                  <div>
                    <p className='font-semibold'>Robert Smith</p>
                    <p>robertsmith@gmail.com</p>
                  </div>
                </div>
                <div className='flex items-center justify-center gap-4'>
                  <p className='text-[#338BFF] bg-[#F9F9F9] px-4 py-2'>225 Bids</p>
                  <p className='bg-yellow rounded-md px-4 py-2 text-white'>Buy Bids</p>
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
