import React from 'react'
import HomeContentHeading from '../../components/ui/HomeContentHeading'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'

const AvailableFinancing = () => {
  return (
    <div>
        <div className='flex justify-between items-center'>
                <HomeContentHeading title={'Available for Financing'} />
                <Link to={`/auctions`} className='text-yellow flex items-center gap-1 font-medium cursor-pointer'>See More<IoIosArrowForward /></Link>
            </div>
    </div>
  )
}

export default AvailableFinancing