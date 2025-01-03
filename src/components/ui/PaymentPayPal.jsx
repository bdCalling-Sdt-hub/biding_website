import React from 'react'
import { FaPaypal } from 'react-icons/fa'
import { usePaypalCreatePaymentMutation } from '../../redux/api/paymentApis'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const PaymentPayPal = ({ data }) => {
    const navigate = useNavigate()
    const [createPayment] = usePaypalCreatePaymentMutation()
    const handlePaypalPayment = () => {
        createPayment({ amount: data?.totalAmount, orderDetails: data }).unwrap().then((res) => {
            // navigate(res?.data?.approvalUrl?.approvalUrl)
            window.open(res?.data?.approvalUrl?.approvalUrl, '_blank');
        }).catch((err) => {
            console.log(err)
            toast.error(err?.message || 'something went wrong')
        })
    }
    return (
        <div className='px-10 py-10'>
            <button onClick={() => {
                if (!data?.totalAmount) {
                    return toast.error('amount cant be empty')
                }
                handlePaypalPayment()
            }} className='flex items-center border text-[#338BFF] border-[#C0DBFF] w-full rounded-md justify-center py-2 '>
                <FaPaypal className='text-[#338BFF]' />
                Checkout With PayPal
            </button>
        </div >
    )
}

export default PaymentPayPal
//http://localhost:3003/paypal/success?paymentId=PAYID-M35YQVI64V07963KL1197018&token=EC-35A624311N426471D&PayerID=8N3S765UA4D3J