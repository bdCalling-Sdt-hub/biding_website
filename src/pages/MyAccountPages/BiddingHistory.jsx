import React from 'react'
import img from '../../assets/mob.png'
import { useGetBiddingHistoryQuery } from '../../redux/api/auctionsApis'
import { useGetProfileQuery } from '../../redux/api/authApis'
import { useNavigate } from 'react-router-dom'
const BiddingHistory = () => {
  const navigate = useNavigate()
  const { data } = useGetBiddingHistoryQuery()
  const { data: profile } = useGetProfileQuery()

  return (
    <div className='h-screen overflow-y-scroll'>
      <h1 className='text-yellow font-medium'>Bidding History</h1>
      {
        data?.data?.map(item => <div onClick={() => navigate(`/product-details/${item?._id}`)} className={`mt-5 p-5 rounded-md flex flex-wrap items-center cursor-pointer justify-between ${profile?.data?._id === item?.winnerId ? 'bg-[#F5EFDC]' : 'bg-[#F9F9F9]'}`}>
          {/* Image and details */}
          <div className='flex items-center gap-2'>
            <img src={item?.image} className='w-20' alt="" />
            <div className='space-y-2'>
              <p>{item?.name}</p>
              <p>Ended on 12/06/24 at 2:25 PM</p>
            </div>
          </div>

          <div className='text-center space-y-2'>
            <p>Bids Placed</p>
            <p className='font-medium'>{item?.bidPlace}</p>
          </div>
          <div className='text-center space-y-2'>
            <p>Winner</p>
            <p className='font-medium'>{item?.status === 'Winner' ? "You" : item?.winningBidderName}</p>
          </div>
          <div className='text-center space-y-2'>
            <p>Your Final Bids</p>
            <p className='font-medium'>{item?.finalBid || 0}</p>
          </div>
          <div className='text-center space-y-2' >
            <p>Winning Bids</p>
            <p className='font-medium'>$ {item?.currentPrice}</p>
          </div>
          <div className='text-center space-y-2'>
            <p>Status</p>
            <p className='font-medium'>{item?.status}</p>
          </div>
        </div>)
      }


    </div>
  )
}

export default BiddingHistory