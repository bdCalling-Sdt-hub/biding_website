import { Flex, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePaypalConfirmPaymentMutation } from '../../redux/api/paymentApis'
import { toast } from 'sonner'

const PaypalSuccess = () => {
    const navigate = useNavigate()
    const [paymentId, setPaymentId] = useState(new URLSearchParams(window.location.search).get('paymentId') || null)
    const [payerID, setPayerID] = useState(new URLSearchParams(window.location.search).get('PayerID') || null)
    const [confirm] = usePaypalConfirmPaymentMutation()
    // console.log(payerID, paymentId)
    if (!payerID || !paymentId) {
        return <div className='w-full h-screen flex justify-center items-center flex-col'>
            <p className='text-2xl' style={{
                color: 'red'
            }}>invalid payerID or paymentId</p>
            <Link className='p-2 px-4 bg-yellow text-white mt-4 rounded-md' to={`/`}>
                back to home
            </Link>
        </div>
    }
    useEffect(() => {
        const data = { payerID, paymentId }
        confirm(data).unwrap().then((res) => {
            // console.log(res)
            navigate('/')
        }).catch((err) => {
            console.log(err)
            // //toast.error(err?.message)
        })
    }, [payerID, paymentId])
    return <div className='w-full h-screen flex justify-center items-center'>
        <Spin size="large" />
    </div>
}

export default PaypalSuccess
