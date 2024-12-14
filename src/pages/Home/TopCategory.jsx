import React, { useRef } from 'react';
import HomeContentHeading from '../../components/ui/HomeContentHeading';
import img1 from '../../assets/topCat1.png';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { useGetTopCategoryQuery } from '../../redux/api/HomeApi';
import { useNavigate } from 'react-router-dom';

const TopCategory = () => {
    const navigate = useNavigate()
    const { data } = useGetTopCategoryQuery();
    // Create refs for navigation buttons
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <div className='-mb-24'>
            <div className='flex justify-between items-center -mb-16 mt-10'>
                <HomeContentHeading title={'Top Categories'} />
            </div>
            <div className='my-5 category'>
                <Swiper
                    onSwiper={(swiper) => {
                        if (swiper.params) {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }
                    }}
                    slidesPerView={2}
                    spaceBetween={5}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        576: {
                            slidesPerView: 4,
                            spaceBetween: 5,
                        },
                        768: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        },
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {
                        data?.data?.map((cat, i) => <SwiperSlide className='cursor-pointer' onClick={() => navigate(`/auctions?category=${cat?.name}`)} >
                            <div className='flex flex-col items-center'>
                                <div className="flex flex-col justify-center items-center h-36 w-36">
                                    <img src={cat?.image} className='object-contain rounded-full ' alt="Image 1" />
                                </div>
                                <h1 className='mt-2 font-medium text-[20px]'>{cat?.name}</h1>
                            </div>
                        </SwiperSlide>)
                    }
                    {/* Add more SwiperSlide components as needed */}
                </Swiper>
            </div>
        </div>
    );
};

export default TopCategory;
