

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
// const stripePromise = loadStripe('pk_test_51JwnGrLiLwVG3jO00U7B3YmokwdPnB6FKd1uresJgkbsL4f5xUfCmbFdBaGO42KvLmLfVzsgo1oIQToXABSTyypS00xQsEgKZ6');
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
// console.log(import.meta.process.VITE_STRIPE_KEY)

const PaymentComponent = ({ onPaymentSuccess, data }) => {
    return (
        <div className="px-14 py-4 payment">
            <Elements stripe={stripePromise}>
                <CheckoutForm onPaymentSuccess={onPaymentSuccess} data={data} />
            </Elements>
        </div>
    )
}

export default PaymentComponent
