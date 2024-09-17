import React from 'react'
import BackButton from '../../components/ui/BackButton'
import prod1 from '../../assets/prod1.png'
import prod2 from '../../assets/prod2.png'
import prod3 from '../../assets/prod3.png'
import user1 from '../../assets/user.png'
import user2 from '../../assets/user2.png'
import user3 from '../../assets/user3.png'
import user4 from '../../assets/user4.png'
import UpcommingProduct from '../../components/ui/UpcommingProduct'
import { Link } from 'react-router-dom'
import { MdOutlineChevronRight } from 'react-icons/md'
const Winner = () => {
  const product = [1, 2, 3, 4]
  return (
    <div>
      <BackButton pageName={'winner'} />
      <div className='bg-white rounded-md p-5 '> 
        {/* Winner list */}
        <div className='grid grid-cols-12 gap-5'>
          <div className='col-span-12  lg:col-span-9'>
            <p className='py-5 font-semibold'>Featured wins within last 24 hours</p>
            {/* product */}
            {
              product?.map((prod) => <div className='flex flex-col lg:flex-row items-center justify-between gap-5 mb-5 rounded-md bg-[#F9F9F9]  px-5 py-5 '>
                <div className='w-full flex items-center gap-5'>
                  <img src={prod1} alt="" className='w-[50px] h-[50px]' />
                  <div>
                    <p className='font-medium'>iphone 14 pro max</p>
                    <p className=''>Auction ended 12 hours ago</p>
                  </div>
                </div>
                <div className='flex  justify-between  w-full items-center'>
                  <div className='flex gap-2  md:gap-20 border-r border-[#DCDCDC] pr-5'>
                    <div className=''>
                      <p>Final Bid</p>
                      <p className='text-[#338BFF] font-medium'>$245.00</p>
                    </div>
                    <div className=''>
                      <p className=''>Bid Place</p>
                      <p className=' font-medium'>287</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 pl-2'>
                    <p>Winner:</p>
                    <div className='flex flex-col items-center'>
                      <img src={user1} className='h-[50px] w-[50px]' alt="" />
                      <p>Rober Smith</p> 
                    </div>
                  </div>
                </div>
              </div>)
            }

          </div>

          <div className='col-span-12 lg:col-span-3 px-2 lg:px-0'>
            <div className='flex items-center justify-between'>
              <p className='font-medium text-[16px] lg:text-[18px]  '>Upcoming Auction:</p>
              <Link to='/upcoming-auction' className='flex items-center text-yellow'>Show More <MdOutlineChevronRight size={20} className='text-yellow' /></Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {product?.map((product, index) => (
                <UpcommingProduct key={index} />
              ))}
            </div>
          </div>
        </div>
        {/* Upcoming auction */}

      </div>
    </div>
  )
}

export default Winner