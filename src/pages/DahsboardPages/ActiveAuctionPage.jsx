import React from 'react'
import ActiveAuction from './ActiveAuction'
import img1 from '../../assets/user6.png'
import img2 from '../../assets/user7.png'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
const ActiveAuctionPage = () => {
    // table data 
    const dataSource = [
        {
            key: "#12333",
            name: "Devon Lane",
            img: img1,
            startingDate: "4:45 PM",
            heightBidder: "Kathryn Murp",
            heightBidderImg: img2,
            heightBid: '$248',
            totalBids: "348",

        },
        {
            key: "#12333",
            name: "Devon Lane",
            img: img1,
            startingDate: "4:45 PM",
            heightBidder: "Kathryn Murp",
            heightBidderImg: img2,
            heightBid: '$248',
            totalBids: "348",

        },
        {
            key: "#12333",
            name: "Devon Lane",
            img: img1,
            startingDate: "4:45 PM",
            heightBidder: "Kathryn Murp",
            heightBidderImg: img2,
            heightBid: '$248',
            totalBids: "348",

        },


    ];
  return (
    <div>
        <div className='flex items-center gap-2 bg-white p-5 rounded-md'>
        <Link to={-1}><IoArrowBackSharp /></Link>
        <span className='font-medium'>Active Auction</span>
        </div>
        <ActiveAuction dataSource={dataSource} />
    </div>
  )
}

export default ActiveAuctionPage