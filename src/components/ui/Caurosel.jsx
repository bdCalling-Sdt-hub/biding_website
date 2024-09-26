import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import img from '../../assets/carousel1.png'
import img2 from '../../assets/carousel2.png'
import { useGetBannerQuery } from '../../redux/api/HomeApi';

const Caurosel = () => {
  const { data: getBanners } = useGetBannerQuery()
  console.log(getBanners?.data);
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {
        getBanners?.data?.map((banner) =><SwiperSlide key={banner?._id}>
          <img src={banner?.url} alt="" />
      </SwiperSlide>
      )
      }


    </Swiper>
  )
}

export default Caurosel