import React, { useState } from 'react'
import BackButton from '../../components/ui/BackButton'
import UpcommingProduct from '../../components/ui/UpcommingProduct'
import { useGetWinnerQuery } from '../../redux/api/winnerApi'
import { Pagination } from 'antd'

const UpcomingAuction = () => {
  const [page, setPage] = useState(1)
  const { data: upcomingData } = useGetWinnerQuery({ status: "UPCOMING", page })//UPCOMING
  return (
    <div className='px-5 lg:px-0 pb-10'>
      <BackButton pageName={'Upcoming Auction'} />
      <h1 className='font-semibold'>Upcoming Auction</h1>
      <div >
        <div className='grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 '>
          {
            upcomingData?.data?.result?.map(pro => (
              <UpcommingProduct product={pro} key={pro?._id} />
            ))
          }
        </div>
        <Pagination
          total={upcomingData?.data?.meta?.total}
          pageSize={upcomingData?.data?.meta?.limit}
          current={upcomingData?.data?.meta?.page || page}
          showSizeChanger={false}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  )
}

export default UpcomingAuction