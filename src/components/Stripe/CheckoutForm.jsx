import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { logEvent, Result, ErrorResult } from '../../Utils/Utils';
import { useAppDispatch, useAppSelector } from '../../Store/hook';
import { PaymentIntant } from '../../States/Payment/PaymentIntantSlice';
import Swal from 'sweetalert2';
import baseURL from '../../AxiosConfig/Config';
const ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '18px',
            color: '#424770',
            letterSpacing: '0.025em',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};
const CheckoutForm = ({ setPaymentStatus, data }) => {
    const { user, loading: userloading } = useAppSelector(state => state.Profile)
    const [loading, setloading] = useState(false)
    const [postal, setPostal] = useState < string > ('');
    const [errorMessage, setErrorMessage] = useState(null);
    // @ts-ignore
    const [paymentMethod, setPaymentMethod] = useState(null);
    const { clientSecret } = useAppSelector(state => state.PaymentIntant)
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useAppDispatch()
    const TokenRef = useRef()
    const [price, setPrice] = useState(data.price)
    const [applyingToken, setApplyingToken] = useState(false)
    useEffect(() => {
        setPrice(data.price)
    }, [data.price])
    useEffect(() => {
        if (!price || !data._id) return
        setApplyingToken(true)
        dispatch(PaymentIntant({ _id: data._id, price: Number(price) }))
        setApplyingToken(false)
    }, [price, data._id]);

    const HandleApplyToken = async () => {
        if (!TokenRef.current.value) {
            return
        }
        try {
            setApplyingToken(true)
            const res = await baseURL.get(`discount/single/${TokenRef.current.value}`, {
                headers: {
                    // "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            const discount = ((res.data.data.discountPercent * data?.price) / 100)
            setPrice(data?.price - discount)
            setApplyingToken(false)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                // @ts-ignore
                text: `${error?.response.data.message}`,
                timer: 1500
            });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setloading(true)
        const target = event.target;
        if (!stripe || !elements || !clientSecret) {
            return setloading(false);
        }
        const cardElement = elements.getElement(CardNumberElement);
        if (!cardElement) {
            return setloading(false);
        }
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    // @ts-ignore
                    name: target.name.value || '',
                    address: {
                        postal_code: postal,
                    },
                },
            }
        });
        if (payload.error) {
            setErrorMessage(payload.error.message || null);
            setPaymentMethod(null);
            setloading(false);
        } else {
            const orderData = {
                transactionID: payload.paymentIntent.id,
                address: target.address.value,
                email: target.email.value,
                phone: target.number.value,
                name: target.name.value,
                amount: data.price,
                productId: data.id,
                quantity: data.quantity,
                status: 'paid'
            }
            setErrorMessage(null);
            setPaymentStatus(orderData)
            // @ts-ignore
            target.reset()
            Swal.fire({
                title: "payment successful",
                text: "Your Payment has been successful.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        setloading(false);
    };
    return (
        <form onSubmit={handleSubmit} className='w-full'>
            <div className='md:grid md:grid-cols-2 gap-2 flex flex-col items-start justify-start md:items-center'>
                <div className='w-full'>
                    <label className=' block' htmlFor="name">Full Name</label>
                    <input
                        className='outline-none p-1'
                        style={{
                            width: "100%",
                            borderBottom: "2px solid #9494943D",
                        }}
                        defaultValue={user?.name}
                        required
                        placeholder="Jenny Rosen"
                        name='name'
                    />
                </div>
                <div className='w-full'>
                    <label className=' block' htmlFor="Email">Email </label>
                    <input
                        type='email'
                        className='outline-none p-1'
                        style={{
                            width: "100%",

                            borderBottom: "2px solid #9494943D",
                        }}
                        defaultValue={user?.email}
                        required
                        placeholder="JennyRosen@gmail.com"
                        name='email'
                    />
                </div>
            </div>
            <div className='md:grid md:grid-cols-2 gap-2 flex flex-col items-start justify-start md:items-center mt-3'>
                <div className='w-full'>
                    <label className=' block' htmlFor="Country">Address</label>
                    <input
                        className='outline-none p-1'
                        style={{
                            width: "100%",
                            borderBottom: "2px solid #9494943D",
                        }}
                        defaultValue={user?.address}
                        required
                        placeholder="dhaka bangladesh"
                        name='address'
                    />
                </div>
                <div className='w-full'>
                    <label className=' block' htmlFor="Number">Phone Number</label>
                    <input
                        type='text'
                        className='outline-none p-1'
                        style={{
                            width: "100%",
                            borderBottom: "2px solid #9494943D",
                        }}
                        defaultValue={user?.phone_number}
                        required
                        placeholder="01566026301"
                        name='number'
                    />
                </div>
            </div>
            <label htmlFor="cardNumber">Card Number</label>
            <CardNumberElement
                className='outline-none p-1 border-b-2 border-[#9494943D]'
                id="cardNumber"
                onBlur={logEvent('blur')}
                onChange={logEvent('change')}
                onFocus={logEvent('focus')}
                onReady={logEvent('ready')}
                options={ELEMENT_OPTIONS}
            />
            <div className='md:grid md:grid-cols-2 gap-2 flex flex-col items-start justify-start md:items-center mt-3'>
                <div className='w-full'>
                    <label htmlFor="expiry">Card Expiration</label>
                    <CardExpiryElement
                        className='outline-none p-1 border-b-2 border-[#9494943D]'
                        id="expiry"
                        onBlur={logEvent('blur')}
                        onChange={logEvent('change')}
                        onFocus={logEvent('focus')}
                        onReady={logEvent('ready')}
                        options={ELEMENT_OPTIONS}
                    />
                </div>
                <div className='w-full flex justify-between items-center gap-[2%]'>
                    <div className='w-[49%]'>
                        <label htmlFor="cvc">CVC</label>
                        <CardCvcElement
                            className='outline-none p-1 border-b-2 border-[#9494943D]'
                            id="cvc"
                            onBlur={logEvent('blur')}
                            onChange={logEvent('change')}
                            onFocus={logEvent('focus')}
                            onReady={logEvent('ready')}
                            options={ELEMENT_OPTIONS}
                        />
                    </div>
                    <div className='w-[49%]'>
                        <label htmlFor="postal">Postal Code</label>
                        <input
                            className='outline-none p-[1px] border-b-2 border-[#9494943D] w-full text-lg'
                            id="postal"
                            required
                            placeholder="12345"
                            value={postal}
                            onChange={(event) => setPostal(event.target.value)}
                        />
                    </div>
                </div>
            </div>
            <p className='capitalize mt-2'>token optional</p>
            <div className='flex justify-between items-center gap-1 border-b pb-2'>
                <input ref={TokenRef} className='w-full border rounded outline-none py-1 px-2' type="text" name="" id="" />
                <button onClick={HandleApplyToken} className='w-20 bg-yellow-100 py-[5px]' type='button'>
                    apply
                </button>
            </div>
            <div className='border-b-2  p-2 pt-4 flex justify-between items-center'>
                <p>Total</p> <p>${price}</p>
            </div>
            {errorMessage && <ErrorResult><p className='text-red-500'>{errorMessage}</p></ErrorResult>}
            {paymentMethod && (
                <Result>Got PaymentMethod: {paymentMethod.id}</Result>
            )}
            <button className='w-full block text-white bg-[#3C3C3C] mt-6 py-3 disabled:bg-gray-400 disabled:pointer-events-none' type="submit" disabled={!stripe || loading || applyingToken}>
                {loading ? 'please wait....' : applyingToken ? 'creating payment' : ' Confirm Pay'}
            </button>
        </form>
    );
};

export default CheckoutForm;
