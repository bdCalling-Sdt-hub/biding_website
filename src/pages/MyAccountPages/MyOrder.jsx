import React from 'react'
import img from '../../assets/mob.png'
import Button from '../../components/ui/Button'
import { CiLocationOn } from 'react-icons/ci'
import { Link } from 'react-router-dom'
const MyOrder = () => {
  const arr = [1,2,3]
  return (
    <div>
      <h1 className='text-yellow font-medium'>My Order</h1>
      {
        arr?.map(item=>
        <div className='bg-[#F9F9F9] rounded-md p-5 mt-5'>
          <div className='flex justify-between flex-wrap items-center'>
            <p>Order ID: #3205994835657</p>
            <p>Expected Delivery Date: 12/06/24</p>
          </div>
          <div className='flex flex-wrap items-center justify-between mt-5'>
            <div className='flex items-center gap-5 mt-5'>
              <img src={img} alt="" />
              <div>
                <h1 className='text-[22px] font-medium'>iphone 14 pro max</h1>
                <p className='flex items-center gap-1 '><CiLocationOn className='text-yellow' /> Shipping Address: Royal Ln. Mesa, New Jersey</p>
              </div>
            </div>
            <div className='space-y-2 text-end '>
              <p>Winning Bids: <span className='font-medium'>$445.00</span></p>
              <p>Paid by Credit Card</p>
             <Link to='/my-profile/track-order/:id'><Button >Track Order</Button></Link>
            </div>
          </div>
  
        </div>
        )
      }
    </div>
  )
}

export default MyOrder