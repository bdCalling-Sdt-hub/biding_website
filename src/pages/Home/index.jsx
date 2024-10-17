import React, { useState } from 'react';
import Caurosel from '../../components/ui/Caurosel';
import Search from './Search';
import FeaturedAuction from './FeaturedAuction';
import TopCategory from './TopCategory';
import WhyChooseUs from './WhyChooseUs';
import UpComingAuction from './UpComingAuction';
import AvailableFinancing from './AvailableFinancing';
const Home = () => {
  
  return (
    <div className=''>
      <Search/>
      <Caurosel />
      <FeaturedAuction/>
      <TopCategory/>
      <UpComingAuction/>
      <AvailableFinancing/>
      <WhyChooseUs/>
    </div>
  );
}

export default Home; 
