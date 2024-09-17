import React from 'react'
import BackButton from '../../components/ui/BackButton'

const TipsAndTricks = () => {
    return (
        <div className='pb-10'>
            <BackButton pageName={'Tips & Tricks'} />
            <h1 className='py-4 font-semibold'>Tips & tricks: </h1>

            {/* master art section */}
            <div>
                <h1 className='mb-2 font-semibold'>1. Master the Art of Bidding </h1>
                <p className='pb-4 leading-7  '><span className='font-semibold'>Start Small: </span>If you’re new to bidding, begin by bidding on lower-value items to get comfortable with the process.
                    Monitor Auctions Closely: Keep a close eye on the auctions you’re interested in, especially in the final minutes when most activity happens.
                    Bid Strategically: Instead of bidding early, consider bidding in the last moments of the auction. This can reduce the chance of a bidding war and help you secure the item at a lower price.</p>
            </div>
            {/* master art section */}
            <div>
                <h1 className='mb-2 font-semibold'>2. Stay Calm if You Get Outbid</h1>
                <p className='pb-4 leading-7  '><span className='font-semibold'>Don’t Panic</span>: If you get outbid, don’t react impulsively. Instead, reassess whether you want to increase your bid or wait for a similar item to become available.</p>
            </div>
            {/* master art section */}
            <div>
                <h1 className='mb-2 font-semibold'>3. Learn From Your Past Bids</h1>
                <p className='pb-4 leading-7  '><span className='font-semibold'>Review Your Bidding History: </span> Analyze your past bids to understand which strategies worked best for you. This can help you refine your approach and increase your chances of winning future auctions.
                Track Prices: Review the final prices of items you were outbid on to get a better sense of the market value and plan accordingly for future bids..</p>
            </div>
            {/* master art section */}
            <div>
                <h1 className='mb-2 font-semibold'>4. Take Advantage of Auction Alerts</h1>
                <p className='pb-4 leading-7  '><span className='font-semibold'>Set Up Bid Notifications:</span>  Enable notifications to receive alerts when you’re outbid or when an auction you’re watching is about to end.
                Auction Starting Soon: Some platforms notify users when new auctions start for items similar to ones they’ve bid on before. Keep an eye on these alerts for more opportunities.</p>
            </div>
        </div>
    )
}

export default TipsAndTricks