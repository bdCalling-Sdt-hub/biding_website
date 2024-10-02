import React from 'react'
import Button from '../../components/ui/Button'
import { Link } from 'react-router-dom'
import { useGetMyBidsQuery } from '../../redux/api/bidApis'
import { useGetProfileQuery } from '../../redux/api/authApis'

const MyBids = () => {
  const { data } = useGetMyBidsQuery()
  const { data: profile } = useGetProfileQuery()
  return (
    <div div >
      <h1 className='text-yellow font-medium'>My Bids</h1>
      <div className='flex items-center justify-between p-5 bg-[#F9F9F9] rounded-md my-5'>
        <p>Total available bids</p>
        <p className='text-[#338BFF] font-medium'>{profile?.data?.availableBid} Bids</p>
      </div>
      <p className='text-center font-medium'>Bids Transactions</p>


      {/* Transaction date history */}
      <div className='px-5'> <div className='flex items-center justify-between font-medium mt-5'>
        <p>Date</p>
        <p>Quantity</p>
        <p>Price</p>
      </div>

        {
          data?.data?.bids?.map((item, i) => <div key={i} className='flex items-center justify-between  mt-5'>
            <p>{item?.createdAt?.split('T')[0]}</p>
            <p>{item?.item}</p>
            <p>${item?.paidAmount}</p>
          </div>)
        }
      </div>
      <div className='max-w-32 mx-auto mt-10'>
        <Link to='/buy-bids'><Button className=''>Buy Bid</Button></Link>
      </div>

    </div >
  )
}

export default MyBids