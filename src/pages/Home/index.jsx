import React, { useState } from 'react';
import Caurosel from '../../components/ui/Caurosel';
import Search from './Search';
import FeaturedAuction from './FeaturedAuction';
import TopCategory from './TopCategory';
const Home = () => {
  
  return (
    <div className=''>
      <Search/>
      <Caurosel />
      <FeaturedAuction/>
      <TopCategory/>
    </div>
  );
}

export default Home; 
