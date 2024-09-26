import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import HomeContentHeading from '../../components/ui/HomeContentHeading'
import UpcommingProduct from '../../components/ui/UpcommingProduct'

const FeaturedAuction = () => {
    return (
        <div className='py-10'>
            <div className='flex justify-between items-center'>
                <HomeContentHeading title={'Featured Auction'} />
                <p className='text-yellow flex items-center gap-1 font-medium cursor-pointer'>See More <IoIosArrowForward /></p>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mx-2 md:mx-0'>
                <UpcommingProduct/>
                <UpcommingProduct/>
                <UpcommingProduct/>
                <UpcommingProduct/>
            </div>

        </div>
    )
}

export default FeaturedAuction