import React from 'react'
import BackButton from '../../components/ui/BackButton'
import { Tabs } from 'antd'
import PaymentStripe from '../../components/ui/PaymentStripe';
import PaymentPayPal from '../../components/ui/PaymentPayPal';

const BuyBids = () => {
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
                    <div className='flex justify-between bg-[#F9F9F9] p-8 rounded-md mb-12'>
                        <div>
                            <h1 className='font-medium text-[28px]'>100 Bids</h1>
                            <p>1 bid/credit = 10 cent</p>
                        </div>
                        <h1 className='text-[20px] font-medium'>$25</h1>
                    </div>
                    <div className='flex justify-between bg-[#F9F9F9] p-8 rounded-md'>
                        <div>
                            <h1 className='font-medium text-[28px]'>200 Bids</h1>
                            <p>1 bid/credit = 10 cent</p>
                        </div>
                        <h1 className='text-[20px] font-medium'>$48</h1>
                    </div>
                </div>
                <div>
                    
                    <div className='bg-white p-8 rounded-md'>
                        <Tabs defaultActiveKey="1" items={items} />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default BuyBids