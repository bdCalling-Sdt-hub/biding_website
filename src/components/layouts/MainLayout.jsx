import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <div className='bg-[#F9F9F9]'>
        <div className='max-w-screen-2xl mx-auto py-2 min-h-[50vh]'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
