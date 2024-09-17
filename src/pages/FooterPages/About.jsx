import React from 'react'
import BackButton from '../../components/ui/BackButton'

const About = () => {
    return (
        <div className='pb-5 px-5 md:px-0'>
            <BackButton pageName={'About'} />
            {/* About us section */}
            <div>
                <h1 className='mb-2 font-semibold'>About Us: </h1>
                <p className='pb-4 leading-7  '>Welcome to Biding Website, your premier destination for dynamic, competitive e-commerce bidding! Our platform is designed to connect buyers and sellers through exciting auctions, offering a wide range of products at unbeatable prices. Whether you're looking for the latest electronics, fashion, home essentials, or rare collectibles, Biding Website provides a transparent and secure environment for everyone to participate in the thrill of online bidding.</p>
            </div>
            {/* Our mission section */}
            <div>
                <h1 className='mb-2 font-semibold'>Our Mission: </h1>
                <p className='pb-4 leading-7'>At Biding Website, we aim to revolutionize the shopping experience by creating a marketplace where affordability meets excitement. Our goal is to empower users to discover great deals through competitive bidding, ensuring that every purchase is both rewarding and fun.</p>
            </div>
            {/* Why choose us section */}
            <div>
                <h1 className='mb-2 font-semibold'>Why Choose Us?: </h1>
                <p className='pb-4 leading-7'>At Biding Website, we aim to revolutionize the shopping experience by creating a marketplace where affordability meets excitement. Our goal is to empower users to discover great deals through competitive bidding, ensuring that every purchase is both rewarding and fun.</p>
                <div className='space-y-3 pb-5'>
                    <li><span className='font-semibold'>Wide Product Range:</span> From cutting-edge gadgets to one-of-a-kind items, our marketplace offers something for everyone.</li>
                    <li><span className='font-semibold'>Secure Transactions:</span> Your safety is our top priority. We use the latest technology to protect your personal information and ensure secure payments.</li>
                    <li><span className='font-semibold'>Easy-to-Use Platform:</span>  Seamlessly browse, bid, and win with our user-friendly interface designed for both seasoned bidders and first-time users.</li>
                    <li><span className='font-semibold'>Global Reach:</span>  Our platform connects buyers and sellers from all over the world, making international bidding easier than ever.</li>
                </div>
            </div>
            {/* Join section */}
            <div className='pt-8'>
                <h1 className='mb-2 font-semibold'>Join the Thrill of Bidding!</h1>
                <p className='pb-4 leading-7'>At Biding Website , every auction is an opportunity to find something amazing. Join our community of savvy shoppers and experience the excitement of bidding on your favorite products today!</p>
            </div>
        </div>
    )
}

export default About