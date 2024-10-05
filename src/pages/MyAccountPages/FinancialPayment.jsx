import React from 'react'
import { useGetFinancialPaymentQuery } from '../../redux/api/paymentApis'
import { CiLocationOn } from 'react-icons/ci';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const FinancialPayment = () => {
  const { data: getFinancialPayment } = useGetFinancialPaymentQuery()
  console.log(getFinancialPayment?.data?.result);
  return (
    <div>
      <h1 className='text-yellow font-medium'>My Order</h1>
      {
        getFinancialPayment?.data?.result?.map(item =>
          <div className='bg-[#F9F9F9] rounded-md p-5 mt-5'>
            <div className='flex justify-between flex-wrap items-center'>
              <p>Order ID: {item?._id}</p>
              <p>Deadline for next installment : <span className='font-medium'>{item?.expectedDeliveryData?.split('T')?.[0] || "No date"}</span></p>
            </div>
            <div className='flex flex-wrap items-center justify-between mt-5'>
              <div className='flex  flex-wrap items-center gap-5 mt-5'>
                <img src={item?.item?.images?.[0]} alt="" />
                <div>
                  <h1 className='text-[22px] font-medium'>{item?.item?.name}</h1>

                  {/* <p>Order On : </p> */}
                  <p>Total Price : <span className='font-semibold'>$ {item?.totalAmount}</span></p>
                </div>
              </div>
              <div className='space-y-2 text-end '>
                <p>Winning Bids: <span className='font-medium'>${item?.winingBid
                }</span></p>
                <p className='pb-5'>Paid by Credit Card</p>
                <Link to={`/due-payment?id=${item?._id}`}><Button >Pay</Button></Link>
              </div>
            </div>

          </div>
        )
      }
    </div>
  )
}

export default FinancialPayment