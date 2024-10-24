import React from 'react'
import { useGetFinancialPaymentQuery } from '../../redux/api/paymentApis'
import { Link, useNavigate } from 'react-router-dom';

const FinancialPayment = () => {
  const { data: getFinancialPayment } = useGetFinancialPaymentQuery()
  console.log(getFinancialPayment?.data?.result);
  const navigate = useNavigate()
  return (
    <div>
      <h1 className='text-yellow font-medium'>Finance Order</h1>
      {
        getFinancialPayment?.data?.result?.map(item =>
          <div className='bg-[#F9F9F9] rounded-md p-5 mt-5'>
            <div className='flex justify-between flex-wrap items-center'>
              <p>Order ID: {item?._id}</p>
              {/* <p>Deadline for next installment : <span className='font-medium'>{item?.expectedDeliveryData?.split('T')?.[0] || "No date"}</span></p> */}
              <p>Monthly payment status: <span className={`font-medium ${item?.monthlyStatus === 'paid' ? '' : 'text-[#FF0000] font-bold'}`}>( {item?.monthlyStatus} )</span></p>
            </div>
            <div className='flex flex-wrap items-center justify-between mt-5'>
              <div className='flex  flex-wrap items-center gap-5 mt-5'>
                <img className='h-24 object-contain' src={item?.item?.images?.[0]} alt="" />
                <div>
                  <h1 className='text-[22px] font-medium'>{item?.item?.name}</h1>

                  {/* <p>Order On : </p> */}
                  <p>Total Price : <span className='font-semibold'>$ {item?.totalAmount}</span></p>

                </div>
              </div>
              {/* paymentLink monthlyStatus */}
              <div className='space-y-2 text-end '>
                <p>Winning Bids: <span className='font-medium'>${item?.winingBid
                }</span></p>
                <p>Number of month : <span className='font-semibold'> {item?.totalMonth}</span></p>
                <p>Paid Installment :<span className='font-semibold'> {item?.paidInstallment}</span> </p>
                <p>Installment Left:<span className='font-semibold'> {item?.installmentLeft}</span> </p>
                <p className='pb-5'>Paid by Credit Card</p>
                <button
                  disabled={item?.monthlyStatus === 'paid' || !item?.paymentLink}
                  onClick={() => {
                    if (item?.paymentLink) {
                      const paymentLink = item.paymentLink.startsWith('http')
                        ? item.paymentLink
                        : `https://${item.paymentLink}`;
                      window.open(paymentLink, '_blank');
                    }
                  }}
                  className='bg-yellow disabled:bg-gray disabled:cursor-not-allowed text-white px-5 py-2 hover:bg-yellow rounded-md'
                >
                  {
                    item?.monthlyStatus === 'paid' ? 'Payment completed for this mony' : 'Pay Now'
                  }

                </button>
                {/* <Link className='bg-yellow text-white px-5 py-2 hover:bg-yellow rounded-md' to={`/due-payment?id=${item?._id}`}>Pay Now</Link> */}
              </div>
            </div>

          </div>
        )
      }
    </div>
  )
}

export default FinancialPayment