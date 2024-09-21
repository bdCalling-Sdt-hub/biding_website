import { Table } from 'antd'
import React from 'react'
import { IoMdLink } from 'react-icons/io';
import { IoEyeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const ActiveAuction = ({ dataSource }) => {


    const columns = [
        {
            title: "SL no.",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Aurcion Item",
            dataIndex: "auctionItem",
            key: "auctionItem",
            render: (_, record) => {
                return (
                    <div className="flex items-center gap-2">
                        <img
                            src={record?.img}
                            className="w-[40px] h-[40px] rounded-[8px]"
                            alt=""
                        />
                        <p className="font-medium">{record?.name}</p>
                    </div>
                );
            },
        },
        {
            title: "Starting Date",
            dataIndex: "startingDate",
            key: "startingDate",
        },

        {
            title: "Height Bidder",
            dataIndex: "heightBidder",
            key: "heightBidder",
            render: (_, record) => {
                return (
                    <div className="flex items-center gap-2">
                        <img
                            src={record?.heightBidderImg}
                            className="w-[40px] h-[40px] rounded-[8px]"
                            alt=""
                        />
                        <p className="font-medium">{record?.heightBidder}</p>
                    </div>
                );
            },
        },
        {
            title: "Height Bid",
            dataIndex: "heightBid",
            key: "heightBid",
        },
        {
            title: "Total Bids",
            dataIndex: "totalBids",
            key: "totalBids",
        },

        {
            title: "Auction Link",
            dataIndex: "key",
            key: "key",
            render: (_, record) => {
                return (
                    <div className="flex items-center justify-center gap-1">
                        <Link className='bg-yellow p-1 rounded-sm'>
                            <IoMdLink size={22} className='text-white' />
                        </Link>
                    </div>
                );
            },
            align: 'center'
        },

    ];


    return (
        <div>
            <Table dataSource={dataSource} columns={columns} className="custom-pagination" pagination={false} />
        </div>
    )
}

export default ActiveAuction