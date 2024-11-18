import React from 'react'
import img from '../../assets/mob.png'
import Button from '../../components/ui/Button'
import { CiLocationOn } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { useMyOrderQuery } from '../../redux/api/paymentApis'
const MyOrder = () => {
  // const {data : getOrder}=
  const { data: getAllOrders } = useMyOrderQuery()
  return (
    <div>
      <h1 className='text-yellow font-medium'>My Order</h1>
      {
        getAllOrders?.data?.result?.map(item =>
          <div className='bg-[#F9F9F9] rounded-md p-5 mt-5'>
            <div className='flex justify-between flex-wrap items-center'>
              <p>Order ID: {item?._id}</p>
              <p>Expected Delivery Date: {item?.expectedDeliveryData || "No date"}</p>
            </div>
            <div className='flex flex-wrap items-center justify-between mt-5'>
              <div className='flex  flex-wrap items-center gap-5 mt-5'>
                <img className='h-24 object-contain' src={item?.item?.images?.[0]} alt="" />
                <div>
                  <h1 className='text-[22px] font-medium'>{item?.item?.name}</h1>
                  <p className='flex items-center gap-1 '><CiLocationOn className='text-yellow' /> Shipping Address : {item?.shippingAddress
                    ?.city}</p>
                </div>
              </div>
              <div className='space-y-2 text-end '>
                <p>Winning Bids: <span className='font-medium'>${Number(item?.winingBid || 0).toFixed(2)
                }</span></p>
                <p className='pb-5'>Paid by {item?.paidBy}</p>
                <Link to={`/my-profile/track-order/${item?._id}`}><Button >Track Order</Button></Link>
              </div>
            </div>

          </div>
        )
      }
      {
        getAllOrders?.data?.result?.length <= 0 && <p>You have no order</p>
      }
    </div>
  )
}

export default MyOrder