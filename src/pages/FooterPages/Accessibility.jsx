import React from 'react'
import BackButton from '../../components/ui/BackButton'

const Accessibility = () => {
    return (
        <div className='pb-10'>
            <BackButton pageName={'Accessibility'} />
            {/* accessibility section */}
            <div>
                <h1 className='mb-2 font-semibold'>Accessibility:</h1>
                <p className='pb-4 leading-7'>At Bidding website, we are committed to ensuring that everyone, regardless of ability or disability, can participate in our online auctions and bidding activities. We believe that accessibility is a fundamental part of our platform, and we strive to make sure that our website is usable by the widest possible audience.</p>
            </div>

            {/* Our Commitment */}
            <div>
                <h1 className='font-semibold text-[20px]'>Our Commitment</h1>
                <p className='py-4'>We are dedicated to:</p>
                <div className='space-y-4'>
                    <li>Ensuring that users with visual, auditory, cognitive, and motor impairments can access and use our website effectively.</li>
                    <li>Complying with international web accessibility standards such as the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA.</li>
                    <li>Regularly updating our platform to ensure accessibility as new tools and guidelines become available.</li>
                </div>
            </div>

            {/* accessibility feature */}
            <div className='mt-10'>
                <h1 className='font-medium mb-5'>1. Screen Reader Compatibility</h1>
                <div className='space-y-4'>
                    <li>Our website is fully compatible with popular screen readers such as NVDA, JAWS, VoiceOver, and TalkBack. Text descriptions, labels, and navigation elements are designed to be accessible.</li>
                    <li>We use alt text for images, ensuring that users with visual impairments can understand the context of visual elements.</li>
                </div>
            </div>
            {/* accessibility feature */}
            <div className='mt-10'>
                <h1 className='font-medium mb-5'>2. Keyboard Navigation</h1>
                <div className='space-y-4'>
                    <li>We ensure that all functionality is accessible via keyboard, allowing users who cannot use a mouse to navigate and interact with the site.</li>
                    <li>You can navigate using Tab, Shift+Tab, and Enter keys for seamless browsing and bidding without a mouse.</li>
                    <li>Our website’s bidding and checkout processes are fully operable with keyboard commands.</li>
                </div>
            </div>
            {/* 3. High Contrast Mode */}
            <div className='mt-10'>
                <h1 className='font-medium mb-5'>3. High Contrast Mode</h1>
                <div className='space-y-4'>
                    <li>We offer a high contrast mode for users with low vision or color blindness. This feature makes text and interface elements easier to distinguish by increasing the contrast between background and foreground colors.</li>
                    <li>Users can toggle this feature through an accessibility menu available at the top of every page.</li>
                </div>
            </div>
        </div>
    )
}

export default Accessibility