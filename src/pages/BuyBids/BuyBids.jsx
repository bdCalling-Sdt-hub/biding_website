import React, { useRef, useState } from 'react'
import BackButton from '../../components/ui/BackButton'
import { Input, Tabs } from 'antd'
import PaymentPayPal from '../../components/ui/PaymentPayPal';
import PaymentComponent from '../../components/Stripe/PaymentComponent';
import { toast } from 'sonner';
import { useConfirmPaymentMutation } from '../../redux/api/paymentApis';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../../redux/api/authApis';

const BuyBids = () => {
    const { data: profile } = useGetProfileQuery();
    const location = useLocation()
    const navigate = useNavigate()
    const inputRef = useRef()
    const [amount, setAmount] = useState()
    const packages = [
        {
            title: '50 Bids',
            amount: 5,
            total: 50
        },
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
    if (!profile?.data?.email) {
        return <Navigate to={'/login'} state={location?.pathname} ></Navigate>
    }
    return (
        <div className='px-5 lg:px-0'>
            <BackButton pageName={'Payment'} />
            {/* <div className='grid grid-cols-1 md:grid-cols-2  gap-5 items-center'> */}
            <div className='bg-white p-8 rounded-md my-5 '>
                <p className='text-end font-medium mb-6'>1 bid/credit = 10 cent</p>
                {
                    packages?.map((item, i) => <div key={i} onClick={() => {
                        setAmount(item?.amount)
                        navigate(`/bid-payment?amount=${item?.amount}`)
                    }} className={`flex justify-between bg-[#F9F9F9] ${amount === item?.amount ? 'bg-yellow-20' : ''} hover:bg-yellow-20 cursor-pointer p-8 py-5 rounded-md mb-4`}>
                        <div>
                            <h1 className='font-medium text-[28px]'>{item?.title}</h1>
                        </div>
                        <h1 className='text-[20px] font-medium'>${item?.amount}</h1>
                    </div>)
                }
                <div className={`flex justify-between bg-[#F9F9F9] p-8 py-5 rounded-md mb-4 gap-2 items-center`}>
                    <input type='number' placeholder='number of bids' className='w-full p-2 rounded-md outline-none border border-yellow' ref={inputRef} />
                    <button onClick={() => {
                        if (!inputRef.current.value) {
                            return //toast.error('please input number of bids first')
                        }
                        if (inputRef.current.value > 99999) {
                            return //toast.error(`you cant buy more then 99999 bids at once`)
                        }
                        setAmount(Number(inputRef.current.value * 10 / 100).toFixed(2))
                        navigate(`/bid-payment?amount=${Number(inputRef.current.value * 10 / 100).toFixed(2)}`)
                    }} className='bg-yellow text-white px-7 rounded-md py-2'>
                        Buy
                    </button>
                    {/* <p className='whitespace-nowrap font-medium'>
                            total : {customPayment && `$ ${data?.totalAmount}`}
                        </p> */}
                </div>
                {/* <p className='flex justify-between items-center'>
                    <span>
                        total  payable amount
                    </span>
                    <span className='font-bold'>
                        $ {amount}
                    </span>
                </p> */}
            </div>
            {/* </div> */}
        </div >
    )
}

export default BuyBids