import React, { useEffect, useState } from 'react';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useGetProfileQuery } from '../../redux/api/authApis';
import { useCreatePaymentIntentMutation } from '../../redux/api/paymentApis';
import { ErrorResult, logEvent, Result } from '../../Utils/Utils';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
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
const CheckoutForm = ({ onPaymentSuccess, data }) => {
    const { data: user } = useGetProfileQuery();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [createIntent, { isLoading }] = useCreatePaymentIntentMutation();
    const [clientSecret, setClientSecret] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    useEffect(() => {
        if (!data?.totalAmount) {
            return
        }
        createIntent(data)
            .unwrap()
            .then((res) => {
                // console.log('res?.data', res?.data);
                setClientSecret(res?.data?.clientSecret);
            }).catch((err) => {
                toast.error(err?.message || 'something went wrong')
            });
    }, [data]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements || !clientSecret) {
            setLoading(false);
            return toast.error('something went wrong');
        }

        const cardElement = elements.getElement(CardNumberElement);
        if (!cardElement) {
            setLoading(false);
            return toast.error('something went wrong');
        }

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: user?.data?.name || 'anonyms',
                    // address: {
                    //     postal_code: postal,
                    // },
                },
            },
        });

        if (payload.error) {
            setErrorMessage(payload.error.message || null);
            setPaymentMethod(null);
            setLoading(false);
        } else {
            // console.log('payload', payload)
            setErrorMessage(null);
            onPaymentSuccess(payload);
            event.target.reset();
            toast.success('Your Payment has been successful.')
            setLoading(false);
        }
        setLoading(false);
    };
    // console.log(clientSecret)
    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="md:grid md:grid-cols-2  gap-2 flex flex-col items-start justify-start md:items-center mb-2">
                <div className="w-full ">
                    <label className="block" htmlFor="name">Full Name</label>
                    <input disabled
                        className="outline-none  p-2 border rounded border-[#9494943D]"
                        style={{ width: "100%", }}
                        defaultValue={user?.data?.name}
                        required
                        placeholder="Jenny Rosen"
                        name="name"
                    />
                </div>
                <div className="w-full">
                    <label className="block" htmlFor="Email">Email</label>
                    <input disabled
                        type="email"
                        className="outline-none  p-2 border rounded border-[#9494943D]"
                        style={{ width: "100%", }}
                        defaultValue={user?.data?.email}
                        required
                        placeholder="JennyRosen@gmail.com"
                        name="email"
                    />
                </div>
            </div>
            <label htmlFor="cardNumber">Card Number</label>
            <CardNumberElement
                className="outline-none p-2 border rounded border-[#9494943D]"
                id="cardNumber"
                onBlur={logEvent('blur')}
                onChange={logEvent('change')}
                onFocus={logEvent('focus')}
                onReady={logEvent('ready')}
                options={ELEMENT_OPTIONS}
            />
            <div className="md:grid md:grid-cols-2 gap-2 flex flex-col items-start justify-start md:items-center mt-3">
                <div className="w-full">
                    <label htmlFor="expiry">Card Expiration</label>
                    <CardExpiryElement
                        className="outline-none p-2 border rounded border-[#9494943D]"
                        id="expiry"
                        onBlur={logEvent('blur')}
                        onChange={logEvent('change')}
                        onFocus={logEvent('focus')}
                        onReady={logEvent('ready')}
                        options={ELEMENT_OPTIONS}
                    />
                </div>
                <div className="w-full flex justify-between items-center gap-[2%]">
                    <div className="w-[100%]">
                        <label htmlFor="cvc">CVC</label>
                        <CardCvcElement
                            className="outline-none border p-2 rounded border-[#9494943D]"
                            id="cvc"
                            onBlur={logEvent('blur')}
                            onChange={logEvent('change')}
                            onFocus={logEvent('focus')}
                            onReady={logEvent('ready')}
                            options={ELEMENT_OPTIONS}
                        />
                    </div>
                    {/* <div className="w-[49%]">
                        <label htmlFor="postal">Postal Code</label>
                        <input
                            className="outline-none p-[1px] border border-[#9494943D] w-full text-lg"
                            id="postal"
                            required
                            placeholder="12345"
                            value={postal}
                            onChange={(event) => setPostal(event.target.value)}
                        />
                    </div> */}
                </div>
            </div>

            {errorMessage && <ErrorResult><p style={{
                color: 'red'
            }} className="text-red-500">{errorMessage}</p></ErrorResult>}
            {paymentMethod && <Result>Got PaymentMethod: {paymentMethod.id}</Result>}
            <button
                className="w-full block text-white bg-yellow disabled:bg-gray mt-6 py-3 disabled:bg-gray-400 disabled:pointer-events-none rounded disabled:cursor-not-allowed"
                type="submit"
                disabled={!stripe || loading || isLoading || !data?.totalAmount || !clientSecret}
            >
                {isLoading ? 'creating intent ...' : loading ? 'please wait....' : `Confirm Payment $ ${data?.totalAmount}`}
            </button>
        </form>
    );
};

export default CheckoutForm;
