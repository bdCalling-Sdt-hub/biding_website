import React from 'react';
import img from '../../assets/mob.png';
import { CiLocationOn } from 'react-icons/ci';
import { Popover, Steps } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetSingleOrderQuery } from '../../redux/api/paymentApis';

const TrackOrder = () => {
    const { id } = useParams()
    const { data: getSingleOrder } = useGetSingleOrderQuery(id)
    console.log('getSingleOrder?.data', getSingleOrder?.data);
    const ENUM_DELIVERY_STATUS = [
        { title: "PAYMENT_PENDING" },
        { title: "PAYMENT_SUCCESS" },
        { title: "PROCESSING" },
        { title: "SHIPPED" },
        { title: "DELIVERED" },
    ];

    const progressItem = getSingleOrder?.data?.statusWithTime?.map((item) => {
        return {
            title: item?.status
        }
    })
    const customDot = (dot, { status, index }) => (
        <Popover
            content={
                <span>
                    step {index} status: {status}
                </span>
            }
        >
            {dot}
        </Popover>
    );
    return (
        <div>
            <h1 className="text-yellow font-medium">Track Order</h1>

            <div className="bg-[#F9F9F9] rounded-md p-5 my-5">
                {/* Order Info */}
                <div className="flex justify-between flex-wrap items-center">
                    <p>Order ID: {getSingleOrder?.data?._id}</p>
                    <p>Expected Delivery Date: {getSingleOrder?.data?.expectedDeliveryData || "No Date"}</p>
                </div>

                {/* Product and Address Info */}
                <div className="flex flex-wrap items-center justify-between mt-5">
                    <div className="flex items-center gap-5 mt-5">
                        <img className='rounded-md' src={getSingleOrder?.data?.item?.images?.[0]} alt="product" />
                        <div>
                            <h1 className="text-[22px] font-medium">{getSingleOrder?.data?.item?.name}</h1>
                            <p className="flex items-center gap-1">
                                <CiLocationOn className="text-yellow" />
                                {getSingleOrder?.data?.shippingAddress?.city}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2 text-end">
                        <p>
                            Winning Bids: <span className="font-medium">${getSingleOrder?.data?.item?.currentPrice}</span>
                        </p>
                        <p>Paid by Credit Card</p>
                    </div>
                </div>


                <div className='mt-8'>
                    <Steps
                        current={progressItem?.length - 1}
                        progressDot={customDot}
                        items={ENUM_DELIVERY_STATUS}
                    />
                </div>

                <div className='max-w-2xl my-8'>
                    <div className='flex justify-between items-center'>
                        <p>Date & Time</p>
                        <p>Status</p>
                    </div>
                    {/* Map through the API response to display status and time */}
                    {getSingleOrder?.data?.statusWithTime?.map((item) => (
                        <div className='flex justify-between items-center mt-2' key={item._id}>
                            <p>{item.status.replace('_', ' ')}</p>
                            <p>{new Date(item.time).toLocaleString()}</p>
                        </div>
                    ))}
                </div>



            </div>
        </div>
    );
};

export default TrackOrder;
