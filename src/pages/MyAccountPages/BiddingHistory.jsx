import React from 'react'
import img from '../../assets/mob.png'
import { useGetBiddingHistoryQuery } from '../../redux/api/auctionsApis'
import { useGetProfileQuery } from '../../redux/api/authApis'
const BiddingHistory = () => {
  const { data } = useGetBiddingHistoryQuery()
  const { data: profile } = useGetProfileQuery()
  console.log('history', data)
  return (
    <div className='h-screen overflow-y-scroll'>
      <h1 className='text-yellow font-medium'>Bidding History</h1>
      {
        data?.data?.map(item => <div className='mt-5 bg-[#F9F9F9] p-5 rounded-md flex flex-wrap items-center justify-between'>
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
            <p className='font-medium'>48</p>
          </div>
          <div className='text-center space-y-2'>
            <p>Winner</p>
            <p className='font-medium'>{profile?.data?.name === item?.winningBidderName ? "You" : item?.winningBidderName}</p>
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