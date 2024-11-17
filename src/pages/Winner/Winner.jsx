import React, { useState } from 'react'
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
import { useGetWinnerQuery } from '../../redux/api/winnerApi'
import { imageUrl } from '../../redux/api/baseApi'
import { Pagination } from 'antd'
const Winner = () => {
  const [page, setPage] = useState(1)
  const { data, isFetching, isError } = useGetWinnerQuery({ status: "COMPLETED", page })//UPCOMING
  const { data: upcomingData } = useGetWinnerQuery({ status: "UPCOMING", page })//UPCOMING
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
              data?.data?.result?.map((product, index) => <div key={index} className='flex flex-col lg:flex-row items-center justify-between gap-5 mb-5 rounded-md bg-[#F9F9F9]  px-5 py-5 '>
                <div className='w-full flex items-center gap-5'>
                  <img src={product?.images[0]} alt={product?.name} className='w-[50px] h-[50px]' />
                  <div>
                    <p className='font-medium'>{product?.name}</p>
                    <div dangerouslySetInnerHTML={{ __html: product?.description }}>
                    </div>
                  </div>
                </div>
                <div className='flex  justify-between  w-full items-center'>
                  <div className='flex gap-2  md:gap-20 border-r border-[#DCDCDC] pr-5'>
                    <div className=''>
                      <p>Final Bid</p>
                      <p className='text-[#338BFF] font-medium'>{Number(product?.bidHistory[product?.bidHistory?.length - 1]?.bidAmount || 0).toFixed(2)}</p>
                    </div>
                    <div className=''>
                      <p className=''>Bid Place</p>
                      <p className=' font-medium'>{product?.bidHistory?.length}</p>
                    </div>
                  </div>
                  <div className='flex items-center justify-between flex-col gap-2 pl-2'>
                    <p className='font-medium'>Winner</p>
                    <div className='flex  items-center gap-2'>
                      <img src={product?.bidHistory[product?.bidHistory?.length - 1]?.user?.profile_image} className='h-[40px] w-[40px]' alt="" />
                      <p className='w-[140px] text-sm'>{product?.bidHistory[product?.bidHistory?.length - 1]?.user?.name}</p>
                    </div>
                  </div>
                </div>
              </div>)
            }
            <Pagination
              total={data?.data?.meta?.total}
              pageSize={data?.data?.meta?.limit}
              current={data?.data?.meta?.page || page}
              showSizeChanger={false}
              onChange={(page) => setPage(page)}
            />
          </div>

          <div className='col-span-12 lg:col-span-3 px-2 lg:px-0'>
            <div className='flex items-center justify-between'>
              <p className='font-medium text-[16px] lg:text-[18px]  '>Upcoming Auction:</p>
              <Link to='/upcoming-auction' className='flex items-center text-yellow'>Show More <MdOutlineChevronRight size={20} className='text-yellow' /></Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {upcomingData?.data?.result?.slice(0, 5)?.map((product, index) => (
                <UpcommingProduct key={index} product={product} />
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