import React, { useRef, useState } from 'react'
import BackButton from '../../components/ui/BackButton'
import { Input, Tabs } from 'antd'
import PaymentPayPal from '../../components/ui/PaymentPayPal';
import PaymentComponent from '../../components/Stripe/PaymentComponent';
import { toast } from 'sonner';
import { useConfirmPaymentMutation } from '../../redux/api/paymentApis';
import { useNavigate } from 'react-router-dom';

const BuyBids = () => {
    const navigate = useNavigate()
    const inputRef = useRef()
    const [data, setData] = useState({
        "item": null,
        "itemType": 'BID',
        "totalBid": 0,
        "totalAmount": 0
    })
    const [confirmPayment] = useConfirmPaymentMutation()
    const [customPayment, setCustomPayment] = useState(false)
    const onPaymentSuccess = (data) => {
        const formateData = {
            paymentId: data?.paymentIntent?.id
        }
        confirmPayment(formateData).unwrap().then((res) => {
            toast.success(res.data?.message || 'order Confirmed')
            navigate('/my-profile')
        }).catch((err) => {
            toast.error(err?.message || 'something went wrong')
        })
    }
    const items = [
        {
            key: '1',
            label: 'Credit Card',
            children: <PaymentComponent data={data} onPaymentSuccess={onPaymentSuccess} />,
        },
        {
            key: '2',
            label: 'PayPal',
            children: <PaymentPayPal data={data} />,
        },
        ,
    ];
    const packages = [
        {
            title: '100 Bids',
            amount: 10,
            total: 100
        },
        {
            title: '200 Bids',
            amount: 20,
            total: 200
        },
        {
            title: '300 Bids',
            amount: 30,
            total: 300
        },
    ]
    return (
        <div className='px-5 lg:px-0'>
            <BackButton pageName={'Payment'} />
            <div className='grid grid-cols-1 md:grid-cols-2  gap-5 items-center'>
                <div className='bg-white p-8 rounded-md my-5 '>
                    <p className='text-end font-medium mb-6'>1 bid/credit = 10 cent</p>
                    {
                        packages?.map((item, i) => <div key={i} onClick={() => {
                            setCustomPayment(false)
                            setData({ ...data, item: item?.title, totalBid: item?.total, totalAmount: item?.amount })
                        }} className={`flex justify-between bg-[#F9F9F9] ${data?.totalAmount === item?.amount ? 'bg-yellow-20' : ''} hover:bg-yellow-20 cursor-pointer p-8 py-5 rounded-md mb-4`}>
                            <div>
                                <h1 className='font-medium text-[28px]'>{item?.title}</h1>
                            </div>
                            <h1 className='text-[20px] font-medium'>${item?.amount}</h1>
                        </div>)
                    }
                    <div className={`flex justify-between bg-[#F9F9F9] p-8 py-5 rounded-md mb-4 gap-2 items-center ${customPayment ? 'bg-yellow-20' : ''}`}>
                        <input type='number' placeholder='number of bids' className='w-full p-2 rounded-md outline-none border border-yellow' ref={inputRef} />
                        <button onClick={() => {
                            if (!inputRef.current.value) {
                                return toast.error('please input number of bids first')
                            }
                            if (inputRef.current.value > 99999) {
                                return toast.error(`you cant buy more then 99999 bids at once`)
                            }
                            setCustomPayment(true)
                            setData({ ...data, item: `${inputRef.current.value} bids`, totalBid: inputRef.current.value, totalAmount: Number(inputRef.current.value * 10 / 100).toFixed(2) })
                        }} className='bg-yellow text-white px-7 rounded-md py-2'>
                            Buy
                        </button>
                        {/* <p className='whitespace-nowrap font-medium'>
                            total : {customPayment && `$ ${data?.totalAmount}`}
                        </p> */}
                    </div>
                    <p className='flex justify-between items-center'>
                        <span>
                            total  payable amount
                        </span>
                        <span className='font-bold'>
                            $ {data?.totalAmount}
                        </span>
                    </p>
                </div>
                <div className=''>
                    <div className='bg-white p-8 rounded-md'>
                        <Tabs defaultActiveKey="1" items={items} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BuyBids