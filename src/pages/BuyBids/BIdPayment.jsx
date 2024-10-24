import React, { useState } from 'react'
import { useConfirmPaymentMutation } from '../../redux/api/paymentApis'
import PaymentComponent from '../../components/Stripe/PaymentComponent'
import PaymentPayPal from '../../components/ui/PaymentPayPal'
import { Tabs } from 'antd'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const BIdPayment = () => {
    const [amount, setAmount] = useState(new URLSearchParams(window.location.search).get('amount') || null)
    // const [category, setCategory] = useState(new URLSearchParams(window.location.search).get('category') || null)
    const navigate = useNavigate()
    const [data, setData] = useState({
        "item": `${amount * 10} Bids`,
        "itemType": 'BID',
        "totalBid": amount * 10,
        "totalAmount": amount || 0
    })
    const [confirmPayment] = useConfirmPaymentMutation()
    const onPaymentSuccess = (data) => {
        // navigate('/my-profile')
        const formateData = {
            paymentId: data?.paymentIntent?.id
        }
        confirmPayment(formateData).unwrap().then((res) => {
            toast.success(res.data?.message || 'order Confirmed')
            navigate('/my-profile')
        }).catch((err) => {
            toast.error(err?.data?.message || 'something went wrong')
        })
    }
// 
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

    return (
        <div className='flex justify-center items-center py-20'>
            <div className='bg-white p-8 rounded-md min-w-[320px] md:min-w-[600px]'>
                <Tabs defaultActiveKey="1" items={items} />
            </div>
        </div>
    )
}

export default BIdPayment
