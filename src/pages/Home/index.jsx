import React, { useState } from 'react';
import Caurosel from '../../components/ui/Caurosel';
import Search from './Search';
import FeaturedAuction from './FeaturedAuction';
import TopCategory from './TopCategory';
import WhyChooseUs from './WhyChooseUs';
const Home = () => {
  
  return (
    <div className=''>
      <Search/>
      <Caurosel />
      <FeaturedAuction/>
      <TopCategory/>
      <WhyChooseUs/>
    </div>
  );
}

export default Home; 
