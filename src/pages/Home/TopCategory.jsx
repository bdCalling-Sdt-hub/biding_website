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
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';

const TopCategory = () => {
    // Create refs for navigation buttons
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div>
            <div className='flex justify-between items-center -mb-16'>
                <HomeContentHeading title={'Active Now'} />
            </div>
            <div className='my-5 category'>
                <Swiper
                    onSwiper={(swiper) => {
                        // Assign refs to Swiper navigation when Swiper instance is available
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
                    navigation={true} // Enable navigation
                    modules={[Pagination, Navigation]} // Ensure both Pagination and Navigation are enabled
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className='flex flex-col items-center'>
                            <div className="flex flex-col justify-center items-center h-32 w-32">
                                <img src={img1} className='object-contain' alt="Image 1" />
                            </div>
                            <h1>Electronics</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center'>
                            <div className="flex flex-col justify-center items-center h-32 w-32">
                                <img src={img1} className='object-contain' alt="Image 1" />
                            </div>
                            <h1>Electronics</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center'>
                            <div className="flex flex-col justify-center items-center h-32 w-32">
                                <img src={img1} className='object-contain' alt="Image 1" />
                            </div>
                            <h1>Electronics</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center'>
                            <div className="flex flex-col justify-center items-center h-32 w-32">
                                <img src={img1} className='object-contain' alt="Image 1" />
                            </div>
                            <h1>Electronics</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center'>
                            <div className="flex flex-col justify-center items-center h-32 w-32">
                                <img src={img1} className='object-contain' alt="Image 1" />
                            </div>
                            <h1>Electronics</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center'>
                            <div className="flex flex-col justify-center items-center h-32 w-32">
                                <img src={img1} className='object-contain' alt="Image 1" />
                            </div>
                            <h1>Electronics</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center'>
                            <div className="flex flex-col justify-center items-center h-32 w-32">
                                <img src={img1} className='object-contain' alt="Image 1" />
                            </div>
                            <h1>Electronics</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center'>
                            <div className="flex flex-col justify-center items-center h-32 w-32">
                                <img src={img1} className='object-contain' alt="Image 1" />
                            </div>
                            <h1>Electronics</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center'>
                            <div className="flex flex-col justify-center items-center h-32 w-32">
                                <img src={img1} className='object-contain' alt="Image 1" />
                            </div>
                            <h1>Electronics</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center'>
                            <div className="flex flex-col justify-center items-center h-32 w-32">
                                <img src={img1} className='object-contain' alt="Image 1" />
                            </div>
                            <h1>Electronics</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center'>
                            <div className="flex flex-col justify-center items-center h-32 w-32">
                                <img src={img1} className='object-contain' alt="Image 1" />
                            </div>
                            <h1>Electronics</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center'>
                            <div className="flex flex-col justify-center items-center h-32 w-32">
                                <img src={img1} className='object-contain' alt="Image 1" />
                            </div>
                            <h1>Electronics</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center'>
                            <div className="flex flex-col justify-center items-center h-32 w-32">
                                <img src={img1} className='object-contain' alt="Image 1" />
                            </div>
                            <h1>Electronics</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center'>
                            <div className="flex flex-col justify-center items-center h-32 w-32">
                                <img src={img1} className='object-contain' alt="Image 1" />
                            </div>
                            <h1>Electronics</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center'>
                            <div className="flex flex-col justify-center items-center h-32 w-32">
                                <img src={img1} className='object-contain' alt="Image 1" />
                            </div>
                            <h1>Electronics</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex flex-col items-center'>
                            <div className="flex flex-col justify-center items-center h-32 w-32">
                                <img src={img1} className='object-contain' alt="Image 1" />
                            </div>
                            <h1>Electronics</h1>
                        </div>
                    </SwiperSlide>
                    {/* Add more SwiperSlide components as needed */}
                </Swiper>
            </div>
        </div>
    );
};

export default TopCategory;
