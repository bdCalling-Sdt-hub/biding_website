import React from 'react';
import img from '../../assets/mob.png';
import { CiLocationOn } from 'react-icons/ci';
import { Popover, Steps } from 'antd';

const TrackOrder = () => {

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
                    <p>Order ID: #3205994835657</p>
                    <p>Expected Delivery Date: 12/06/24</p>
                </div>

                {/* Product and Address Info */}
                <div className="flex flex-wrap items-center justify-between mt-5">
                    <div className="flex items-center gap-5 mt-5">
                        <img src={img} alt="product" />
                        <div>
                            <h1 className="text-[22px] font-medium">iPhone 14 Pro Max</h1>
                            <p className="flex items-center gap-1">
                                <CiLocationOn className="text-yellow" />
                                Shipping Address: Royal Ln. Mesa, New Jersey
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2 text-end">
                        <p>
                            Winning Bids: <span className="font-medium">$445.00</span>
                        </p>
                        <p>Paid by Credit Card</p>
                    </div>
                </div>


                <div className='mt-8'>
                    <Steps
                        current={2}
                        progressDot={customDot}
                        
                        items={[
                            {
                                title: 'Payment Success',
                            },
                            {
                                title: 'Processing',
                            },
                            {
                                title: 'Shipped',
                            },
                            {
                                title: 'Delivired',
                            },
                        ]}
                    />
                </div>

                        <div className='max-w-2xl my-8'>
                            <div className='flex justify-between items-center'>
                                <p>Date & Time</p>
                                <p>Status</p>
                            </div>
                            <div className='flex justify-between items-center mt-2'>
                                <p>Your item is shipped</p>
                                <p>13 July, 2024 at 07:56 PM</p>
                            </div>
                            <div className='flex justify-between items-center mt-2'>
                                <p>Your item is delivered</p>
                                <p>14 July, 2024 at 11:42 AM</p>
                            </div>
                            <div className='flex justify-between items-center mt-2'>
                                <p>Your Payment is successful</p>
                                <p>12 July, 2024 at 03:22 PM</p>
                            </div>
                        </div>
                                


            </div>
        </div>
    );
};

export default TrackOrder;
