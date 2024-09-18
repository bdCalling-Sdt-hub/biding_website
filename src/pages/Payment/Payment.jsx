import React from 'react'
import BackButton from '../../components/ui/BackButton'
import img from '../../assets/phone1.png'
import { Form, Input, Tabs } from 'antd'
import CheckoutFormStripe from '../../components/ui/PaymentStripe'
import PaymentStripe from '../../components/ui/PaymentStripe'
import PaymentPayPal from '../../components/ui/PaymentPayPal'

const Payment = () => {
  

    const items = [
        {
            key: '1',
            label: 'Credit Card',
            children: <PaymentStripe/>,
        },
        {
            key: '2',
            label: 'PayPal',
            children: <PaymentPayPal/>,
        },
        ,
    ];
    return (
        <div className='px-5 lg:px-0'>
            <BackButton pageName={'Payment'} />
            <div className='grid grid-cols-1 md:grid-cols-2  gap-5'>
                <div className='bg-white p-8 rounded-md my-5'>
                    <p className='font-medium text-[24px]'>Winning Product</p>
                    <p className='font-medium text-[20px] mt-2'>Apple iPhone 14 Pro Max</p>
                    <img src={img} className='w-full py-5' alt="" />
                    <div>
                        <div className='flex justify-between items-center pb-3'>
                            <p>Winning Price</p>
                            <p className='font-semibold'>$548.00</p>
                        </div>
                        <div className='flex justify-between items-center pb-3'>
                            <p>Shipping Fee:</p>
                            <p className='font-semibold'>Free</p>
                        </div>
                        <div className='flex justify-between items-center '>
                            <p>Total Fee</p>
                            <p className='font-semibold'>$560.00</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='bg-white p-8 rounded-md my-5 space-y-3'>
                        <h1 className='text-[24px] font-medium'>Shipping Address</h1>
                        <p>Full Name: <span className='font-medium'>Robert Smith</span></p>
                        <p>Street Address:<span className='font-medium'> 1901 Thornridge Cir. Shiloh, Hawaii 81063</span></p>
                        <p>City:<span className='font-medium'> San Jose</span></p>
                        <p>State: <span className='font-medium'> South Dakota</span></p>
                        <p>Zip Code:<span className='font-medium'> 62957</span></p>
                        <p>Phone Number: <span className='font-medium'> (406) 555-0120</span></p>
                        <div className='pt-5'>
                            <button className='text-yellow border  rounded-lg w-[70%] py-1'>Change Shipping Address</button>
                        </div>
                    </div>
                    <div className='bg-white p-8 rounded-md'>
                        <Tabs defaultActiveKey="1" items={items} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment