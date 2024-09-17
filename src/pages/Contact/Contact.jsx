import React from 'react'
import BackButton from '../../components/ui/BackButton'

const Contact = () => {
    return (
        <div className='mb-10 px-5 md:px-0'>
            <BackButton pageName={'Contact'} />
            <div>
                <h1 className='text-[20px] font-semibold'>Contact Us:</h1>
                <p className='mt-4'>At Bidding website, we are committed to providing you with the best possible experience. Whether you have a question, need assistance, or want to provide feedback, we’re here to help!</p>
            </div>
            {/* Get in touch */}
            <div className='mt-5'>
                <p className='font-medium'>Get in Touch with Us</p>
                <p>If you need support or have inquiries, please reach out through one of the following methods:</p>
            </div>
            {/* Customer support */}
            <div className='space-y-3 mt-5'>
                <p className='font-medium'>1. Customer Support</p>
                <div className='ml-5 space-y-2'>
                    <li>Our dedicated support team is available to assist you with any issues related to your account, bidding process, payments, or orders.</li>
                    <li><span className='font-medium'>Email:</span> biddingsupport@website.com</li>
                    <li><span className='font-medium'>Phone:</span>+123-456-7890</li>
                </div>
            </div>
            {/* Business inquiress*/}
            <div className='space-y-3 mt-5' >
                <p className='font-medium'>2. Business Inquiries</p>
                <div className='ml-5 space-y-2'>
                    <li>For partnerships, advertising, or business collaboration, contact our business development team.</li>
                    <li><span className='font-medium'>Email:</span>biddingsupport@website.com</li>
                    <li><span className='font-medium'>Phone:</span>+123-456-7890</li>
                </div>
            </div>
        </div>
    )
}

export default Contact