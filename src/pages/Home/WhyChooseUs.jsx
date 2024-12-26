import React from 'react';
import HomeContentHeading from '../../components/ui/HomeContentHeading';
import { IoIosTimer } from 'react-icons/io';
import { FaTruckFast } from 'react-icons/fa6';
import { MdOutlineHeadsetMic } from 'react-icons/md';

const WhyChooseUs = () => {
    return (
        <div className='my-10'>
            <div>
                <HomeContentHeading title={'Why Choose Us?'} />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 justify-between mx-2 md:mx-0  items-center mt-5 gap-5'>
                <div className='bg-white p-8 rounded-md space-y-2'>
                    <div className='bg-yellow p-2 rounded-md w-10'>
                        <IoIosTimer className='text-white' size={25} />
                    </div>
                    <h1 className='text-[24px] font-medium'>Amazing deals!</h1>
                    <p>You can bid on a wide range of products from electronics to collectibles, often at a fraction of the retail price. Our auctions allow you to get unbeatable deals on high-quality items.</p>
                </div>
                <div className='bg-white p-8 rounded-md space-y-2'>
                    <div className='bg-[#15CF74] p-2 rounded-md w-10'>
                        <FaTruckFast className='text-white' size={25} />
                    </div>
                    <p className='text-[24px] font-medium'>Free Shipping</p>
                    <p>Treat yourself to the joy of shopping. Start exploring now and experience the freedom of free shipping. Happy bidding! With Sellaze, also there are no surprise costs.</p>
                </div>
                <div className='bg-white p-8 rounded-md space-y-2'>
                    <div className='bg-[#338BFF] p-2 rounded-md w-10'>
                        <MdOutlineHeadsetMic className='text-white' size={25} />
                       
                    </div>
                    <p className='text-[24px] font-medium'>24/7 Customer Service</p>
                    <p>Got questions? Our support team is available 24/7 to assist with any inquiries or issues. We're here to ensure your bidding experience is seamless and enjoyable.</p>
                </div>
            </div>
        </div>
    );
}

export default WhyChooseUs;
