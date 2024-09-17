import React from 'react'
import BackButton from '../../components/ui/BackButton'

const Help = () => {
  return (
    <div className='mb-10 px-5 md:px-0'>
    <BackButton pageName={'Help'} />
    <div>
        <h1 className='text-[20px] font-semibold'>Help:</h1>
        <p className='mt-4'>Welcome to the Bidding website Help Center! We're here to provide guidance and support to ensure you have a smooth and enjoyable experience on our platform. Below, you’ll find information on common issues and how to resolve them.</p>
    </div>
    {/* Get in touch */}
    <div className='mt-5'>
        <p className='font-medium'>1. Getting Started</p>
        <p>Creating an Account: Visit our Sign Up page and follow the easy steps to register.
        Bidding on Items: Browse auctions, place bids, and track your active bids in your account dashboard.</p>
    </div>
    {/* Account managment */}
    <div className='space-y-3 mt-5'>
        <p className='font-medium'>2. Account Management</p>
        <div className='ml-5 space-y-2'>
            <li>Forgot Password: If you’ve forgotten your password, click on the "Forgot Password" link on the login page. Follow the prompts to reset your password through the email provided.</li>
            <li>Updating Personal Information: To update your profile, address, or payment details, go to "My Account" and edit your information.</li>
            <li>Account Security: Make sure to use a strong password and enable two-factor authentication (if available) to keep your account secure.</li>
        </div>
    </div>
    {/* Biding Support  */}
    <div className='space-y-3 mt-5'>
        <p className='font-medium'>3. Bidding Support</p>
        <div className='ml-5 space-y-2'>
            <li>How to Place a Bid: Simply find the item you want, enter your bid amount, and click "Place Bid." Be sure to confirm your bid, as all bids are binding.</li>
            <li>Automatic Bidding: You can set a maximum bid, and our system will place incremental bids on your behalf up to that amount, keeping you competitive without manually bidding.</li>
            <li>Outbid Notifications: If you’ve been outbid, we’ll notify you via email or app notification (if enabled) so you can place another bid before the auction ends.</li>
        </div>
    </div>
    
    {/* Shopping and delivery  */}
    <div className='space-y-3 mt-5'>
        <p className='font-medium'>4. Shipping and Delivery</p>
        <div className='ml-5 space-y-2'>
            <li>How Shipping Works: Sellers are responsible for shipping items to buyers. Shipping costs, methods, and estimated delivery times will be listed in the auction details.</li>
            <li>Tracking Your Order: After payment is complete, you’ll receive a shipping confirmation with tracking details, allowing you to monitor the delivery status.</li>
            <li>Shipping Delays: In case of delays, please reach out to the seller directly. If you cannot resolve the issue, contact our customer support for assistance.</li>
        </div>
    </div>
    
</div>
  )
}

export default Help