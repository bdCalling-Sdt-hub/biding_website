import React from 'react';
import income from '../../assets/income.png'
import auction from '../../assets/auction.png'
import user from '../../assets/user5.png'
import IncomeOverview from '../../components/ui/IncomeOverview';
import { Link } from 'react-router-dom';
import img1 from '../../assets/user6.png'
import img2 from '../../assets/user7.png'
import ActiveAuction from './ActiveAuction';
import TopBidderAndPerformingTable from '../../components/ui/TopBidderAndPerformingTable';
const DashboardHome = () => {

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

    // Top biddder table data

    const topBidderData = [
        {
            key: "01",
            bidder: "Devon Lane",
            img: img1,
            totalWin: "84",
        },
        {
            key: "02",
            bidder: "Hari Danang",
            img: img2,
            totalWin: "84",
        },
    ]
    return (
        <div>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-8'>
                    {/* stastics card */}
                    <div className='flex justify-between items-center gap-5'>
                        <div className=' bg-white rounded-md w-full text-center py-5'>
                            <p className='font-medium mb-2'>Income</p>
                            <img src={income} className='mx-auto' alt="" />
                            <p className='font-medium mt-2'>$8250</p>
                        </div>
                        <div className=' bg-white rounded-md w-full text-center py-5 '>
                            <p className='font-medium mb-2'>Total User</p>
                            <img src={user} className='mx-auto' alt="" />
                            <p className='font-medium mt-2'>$852,356</p>
                        </div>
                        <div className=' bg-white rounded-md w-full text-center py-5'>
                            <p className='font-medium mb-2'>Total Auction</p>
                            <img src={auction} className='mx-auto' alt="" />
                            <p className='font-medium mt-2'>$52,650</p>
                        </div>
                    </div>

                    {/* Income Overview */}

                    <div className='bg-white mt-5 rounded-md p-5'>
                        <IncomeOverview />
                    </div>


                </div>
                <div className='col-span-4'>
                    <div>
                        <div className='p-3 rounded-md bg-white'>
                            <TopBidderAndPerformingTable dataSource={topBidderData} tableName={'Top Bidder'} title ={'Bidder'} total={"Total Win"} />
                        </div>
                    </div>
                    <div className='mt-5'>
                        <div className='p-3 rounded-md bg-white'>
                            <TopBidderAndPerformingTable dataSource={topBidderData} tableName={'Top-Performing Auctions'} title ={'Auction Item'} total={"Winning Bid"} />
                        </div>
                    </div>
                </div>
            </div>
            {/* active auction */}

            <div className='bg-white rounded-md p-5 mt-5'>
                <div className='flex items-center justify-between my-5 '>
                    <p className='text-xl font-semibold'>Active Auction</p> <Link to={`/admin/active-auction`}>
                        View all
                    </Link>

                </div>
                <ActiveAuction dataSource={dataSource} />
            </div>
        </div>
    );
}

export default DashboardHome;
