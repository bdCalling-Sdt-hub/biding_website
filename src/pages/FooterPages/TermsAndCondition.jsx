import React from 'react'
import BackButton from '../../components/ui/BackButton'

const TermsAndCondition = () => {
    return (
        <div className='py-2 pb-10'>
            <BackButton pageName={'Terms and Conditions'} />
            {/* terms and condtions */}
            <div>
                <h1 className='mb-2 text-[20px] font-semibold'>Terms and Conditions: </h1>
                <p className='pb-4 leading-7  '>Welcome to Biding Website. These Terms and Conditions govern your access to and use of our e-commerce bidding platform. By using our website, you agree to comply with these terms. Please read them carefully before participating in any auctions or transactions.</p>
            </div>

            {/* eligibility */}
            <div className='mt-10'>
                <h1 className='font-semibold'>1. Eligibility</h1>
                <p className='py-2'>To use Biding Website, you must:</p>
                <div className='space-y-2'>
                    <li>Be at least 18 years old or of legal age in your country.</li>
                    <li>Provide accurate and up-to-date information during registration.</li>
                    <li>Have a valid payment method linked to your account.</li>
                </div>
            </div>
            {/* Account registration */}
            <div className='mt-10'>
                <h1 className='font-semibold pb-5'>2. Account Registration</h1>
                <div className='space-y-2'>
                    <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                    <li>You agree to notify us immediately of any unauthorized use of your account.</li>
                    <li>Bidding website reserves the right to suspend or terminate your account for any violation of these terms.</li>
                </div>
            </div>

            {/* Biding process */}
            <div className='mt-10'>
                <h1 className='font-semibold pb-5'>3. Bidding Process</h1>
                <div className='space-y-2'>
                    <li>Bidding is open to all registered users. Each bid placed is a binding offer to purchase the item.</li>
                    <li>All bids are final and cannot be canceled or withdrawn once placed.</li>
                    <li>The highest bidder at the close of the auction will be deemed the winner and is obligated to complete the purchase.</li>
                </div>
            </div>

            {/* Payment Terms  */}
            <div className='mt-10'>
                <h1 className='font-semibold pb-5'>4. Payment Terms</h1>
                <div className='space-y-2'>
                    <li>Payment must be made within the time frame specified after winning an auction.</li>
                    <li>Bidding website accepts payments via credit/debit cards, PayPal, and other methods as specified on our platform.</li>
                    <li>Failure to make timely payment may result in the cancellation of your order and suspension of your account.</li>
                </div>
            </div>
        </div>
    )
}

export default TermsAndCondition