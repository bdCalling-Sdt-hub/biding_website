import React, { useState } from 'react'
import HomeContentHeading from '../../components/ui/HomeContentHeading'
import { IoIosArrowForward } from 'react-icons/io'
import { useGetWinnerQuery } from '../../redux/api/winnerApi'
import UpcommingProduct from '../../components/ui/UpcommingProduct'
import { Link } from 'react-router-dom'

const UpComingAuction = () => {
    const [page, setPage] = useState(1)
    const { data: upcomingData } = useGetWinnerQuery({ status: "UPCOMING", page })
    return (
        <div>
            <div className='flex justify-between items-center'>
                <HomeContentHeading title={'Upcoming  Auction'} />
                <Link to='/upcoming-auction' className='text-yellow flex items-center gap-1 font-medium cursor-pointer'>See More <IoIosArrowForward /></Link>
            </div>
            <div className='grid grid-col-1 md:grid-cols-4 gap-5 my-5 px-2 md:px-0'>
                {upcomingData?.data?.result?.slice(0, 4)?.map((product, index) => (
                    <UpcommingProduct key={index} product={product} />
                ))}
            </div>

        </div>
    )
}

export default UpComingAuction