import React from 'react'
import Button from '../../components/ui/Button'
import { Link } from 'react-router-dom'

const MyBids = () => {
  return (
    <div>
      <h1 className='text-yellow font-medium'>My Bids</h1>
      <div className='flex items-center justify-between p-5 bg-[#F9F9F9] rounded-md my-5'>
        <p>Total available bids</p>
        <p className='text-[#338BFF] font-medium'>124 Bids</p>
      </div>
      <p className='text-center font-medium'>Bids Transactions</p>


      {/* Transaction date history */}
      <div className='px-5'>
        <div className='flex items-center justify-between font-medium mt-5'>
          <p>Date</p>
          <p>Quantiy</p>
          <p>Price</p>
        </div>
        <div className='flex items-center justify-between  mt-5'>
          <p>12/07/24</p>
          <p>205</p>
          <p>$25</p>
        </div>
        <div className='flex items-center justify-between  mt-5'>
          <p>08/07/24</p>
          <p>175</p>
          <p>$299</p>
        </div>
        <div className='flex items-center justify-between  mt-5'>
          <p>08/07/24</p>
          <p>175</p>
          <p>$28</p>
        </div>
        <div className='flex items-center justify-between  mt-5'>
          <p>08/07/24</p>
          <p>175</p>
          <p>$25</p>
        </div>
      </div>
      <div className='max-w-32 mx-auto mt-10'>
        <Link to='/buy-bids'><Button className=''>Buy Bid</Button></Link>
      </div>

    </div>
  )
}

export default MyBids