import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { IoArrowBackSharp, IoLocationOutline } from 'react-icons/io5';
import { Input, Table } from 'antd';
import Button from '../../components/ui/Button';
import { useSocketContext } from '../../Providers/SocketProviders';
import { useGetProfileQuery } from '../../redux/api/authApis';
import { toast } from 'sonner';
import { useGetSingleAuctionQuery } from '../../redux/api/auctionsApis';
import { useGetWinnerQuery } from '../../redux/api/winnerApi';
import UpcommingProduct from '../../components/ui/UpcommingProduct';
import { useMemo } from 'react';

// Table columns definition
const columns = [
    {
        title: 'Bid',
        dataIndex: 'bid',
        key: 'bid',
    },
    {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
        render: (user) => (
            <div className="flex items-center">
                <img
                    src={user.image}
                    alt={user.name}
                    style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
                />
                <span>{user.name}</span>
            </div>
        ),
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
];

const ProductDetails = () => {
    const { socket } = useSocketContext();
    const { id, } = useParams();
    const navigate = useNavigate();
    const [auction, setAuction] = useState({});
    const [numberOfBids, setNumberOfBids] = useState(0);
    const [bidBuddyUser, setBidBuddyUser] = useState({});
    const [time, setTime] = useState(new URLSearchParams(window.location.search).get('time') || 9)
    // Get auction and similar product data
    const { data: getSingleAuction } = useGetSingleAuctionQuery(id);
    const { data: similarProduct } = useGetWinnerQuery({ category: getSingleAuction?.data?.category || null });

    // Get profile data
    const { data: profile } = useGetProfileQuery();
    useEffect(() => {
        setAuction(getSingleAuction?.data);
        // setTime(getSingleAuction?.data?.countdownTime) uniqueBidders
        const filterBidUser = getSingleAuction?.data?.bidBuddyUsers?.filter(item => profile?.data?._id === item?.user);
        setBidBuddyUser(filterBidUser?.[0]);
    }, [getSingleAuction?.data, profile]);
    const combinedDateTime = useMemo(() => {
        console.log(auction?.activateTime)
        return new Date(`${auction?.activateTime}`)
    }, [auction?.activateTime]);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(combinedDateTime));

    const formatTimeLeft = (time) => {
        return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
    };
    useEffect(() => {
        const interval = setInterval(() => {
            const updatedTimeLeft = calculateTimeLeft(combinedDateTime);
            setTimeLeft(updatedTimeLeft);
            if (updatedTimeLeft.total <= 0) {
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [combinedDateTime, formatTimeLeft(timeLeft)]);
    useEffect(() => {
        if (auction?.status !== 'ACTIVE' || time === 0) {
            return;
        }
        const interval = setInterval(() => {
            setTime(prev => prev - 1);
            const params = new URLSearchParams(window.location.search);
            params.set('time', time - 1);
            window.history.pushState(null, "", `?${params.toString()}`);
        }, 1000);
        return () => clearInterval(interval);
    }, [auction?.status, time]);

    /** Get unique bidder profile image */
    /** Current highest bidder table data format */
    const heightBidderDataFormat = auction?.bidHistory?.slice(-2)?.map((bidder, i) => {
        const formattedTime = new Date(bidder?.time).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
        return {
            key: i + 1,
            bid: bidder?.bidAmount,
            user: {
                name: bidder?.name,
                image: bidder?.profile_image,
            },
            time: formattedTime,
        };
    });

    // Manual bid handler
    const handleBid = () => {
        if (!socket) {
            return;
        }
        socket.emit("place-manual-bid", { auction_id: id, user_id: profile?.data?._id });
    };

    // WebSocket events handling
    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.emit('joinAuction', id);

        socket.on("bidHistory", (updatedBidHistory) => {
            // console.log('updatedBidHistory', updatedBidHistory)
            if (updatedBidHistory?.updatedAuction?._id === id) {
                setAuction(updatedBidHistory?.updatedAuction);
                setTime(updatedBidHistory?.updatedAuction?.countdownTime)
                const filterBidUser = updatedBidHistory?.updatedAuction?.bidBuddyUsers?.filter(item => profile?.data?._id === item?.user);
                // console.log('updatedBidHistory',filterBidUser?.[0])
                setBidBuddyUser(filterBidUser?.[0]);
            }
        });

        socket.on('socket-error', (error) => {
            toast.error(error?.errorMessage || 'Something went wrong');
        });

        return () => {
            socket.off('bidHistory');
            socket.off('socket-error');
            socket.emit('leaveAuction', id);
        };
    }, [socket, id, profile?.data?._id]);

    // Timer logic for auction countdown

    // console.log(getSingleAuction?.data?.status, profile?.data?._id, getSingleAuction?.data?.bidHistory?.[auction?.bidHistory?.length - 1]?.user)
    // console.log('auction',getSingleAuction?.data)
    return (
        <div>
            <div className='py-3 flex items-center gap-2'>
                <Link to={'/'}><IoArrowBackSharp className='text-yellow' /></Link>
                <p>Home / Product Details </p>
            </div>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-12 lg:col-span-10 mx-5 lg:mx-0'>
                    <div className='flex flex-col lg:flex-row justify-between gap-10'>
                        <div className='w-full'>
                            <div>
                                <img src={auction?.images?.[0] ?? 'default_image_url'} className='w-full rounded-md' alt="" />
                            </div>
                            <div className='flex justify-between items-center mt-5 gap-4'>
                                {[1, 2, 3].map((i) => (
                                    <div className='h-[80px] w-full' key={i}>
                                        <img src={auction?.images?.[i] ?? 'default_image_url'} className='rounded-md h-[120px]' alt="" />
                                    </div>
                                ))}
                            </div>
                            <div className='bg-white rounded-md mt-14 py-2'>
                                <h1 className='text-[#2E2E2E] pb-2 font-medium mt-5'>Other bidders in this auction</h1>
                                <div className='flex flex-wrap items-center gap-5 ml-2'>
                                    {auction?.uniqueBidders?.slice(0, 14).map((user, index) => (
                                        <img key={index} src={user?.profile_image} className='rounded-full w-[80px] h-[80px]' alt="" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='bg-white py-5 px-8 w-full rounded-md'>
                            <h1 className='text-[26px] font-semibold'>{auction?.name}</h1>
                            <div className='flex justify-between py-5'>
                                <p>Current BID:</p>
                                <p className='text-[#338BFF] text-[26px] font-semibold'>{auction?.financeAvailable ? <span style={{
                                    color: '#000000'
                                }} className='text-base font-normal -mt-2 mr-3 inline-block'>(finance available)</span> : ''}
                                    ${auction?.bidHistory?.[auction?.bidHistory?.length - 1]?.bidAmount ?? '0'}
                                </p>
                            </div>
                            {
                                auction?.financeAvailable && <div style={{
                                    background: 'black',
                                    color: '#FFFFFF'
                                }} className='flex justify-between items-center gap-2 p-2 rounded-md mb-4'>
                                    <p>Total Months For Financing: <span className='text-yellow'>{auction?.totalMonthForFinance}</span></p>
                                    <p>Per Months : <span className='text-yellow'>${Number(auction?.bidHistory?.[auction?.bidHistory?.length - 1]?.bidAmount ?? 0 / auction?.totalMonthForFinance).toFixed(2)}</span></p>
                                </div>
                            }
                            <p>Current Highest Bidder</p>
                            {auction?.bidHistory?.length < 1 ? (
                                <p>No bid yet!</p>
                            ) : (
                                <div className='flex items-center gap-5 mt-5 mb-5'>
                                    <img src={auction?.bidHistory?.[auction?.bidHistory?.length - 1]?.profile_image ?? 'default_profile_image_url'} className='rounded-full h-[150px] w-[150px]' alt="" />
                                    <div>
                                        <p className='font-semibold text-[20px]'>{auction?.bidHistory?.[auction?.bidHistory?.length - 1]?.user?.name}</p>
                                        <p className='flex items-center gap-2'>
                                            <IoLocationOutline className='text-yellow' /> {auction?.bidHistory?.[auction?.bidHistory?.length - 1]?.location || 'Location Not Available'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Top bidder table */}
                            <Table columns={columns} dataSource={heightBidderDataFormat?.reverse()} size="middle" pagination={false} />

                            {auction?.status === 'COMPLETED' ? (
                                profile?.data?._id === auction?.bidHistory?.[auction?.bidHistory?.length - 1]?.user ? (
                                    <div className='text-center'>
                                        <p className='font-semibold text-4xl mt-3' style={{ color: '#338BFF' }}>Congratulations</p>
                                        <p>You Are the Winning Bidder!</p>
                                        <div onClick={() => { navigate(`/payment?id=${id}`); window.location.reload() }} className='lg:px-10 mt-5'>
                                            <Button className='py-2'>Proceed to Pay</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <p className='font-semibold text-4xl mt-3' style={{ color: '#338BFF' }}>Ops!</p>
                                        <p>You have lost the auction</p>
                                    </div>
                                )
                            ) : (
                                <div>
                                    <div className='text-center mt-5'>
                                        <h1 className='text-[36px] font-medium text-[#338BFF]'>
                                            {auction?.status === 'ACTIVE' ? `00 :00:0${time}` :
                                                formatTimeLeft(timeLeft)?.startsWith('-') ? '00:00:00' : formatTimeLeft(timeLeft)}</h1>
                                        <p>Time Left</p>
                                    </div>

                                    {bidBuddyUser?.isActive ? (
                                        <div className='flex justify-between items-center lg:px-10 mt-5'>
                                            <button
                                                onClick={() => {
                                                    if (bidBuddyUser?.isActive) {
                                                        socket.emit("stopBidBuddy", { auctionId: id, userId: profile?.data?._id, totalBids: Number(bidBuddyUser?.availableBids) });
                                                    }
                                                }}
                                                className='py-3 px-8 rounded-md'
                                                style={{ background: 'red', color: 'white' }}
                                            >
                                                Stop Bidding
                                            </button>
                                            <p className='text-xl font-medium'>
                                                Bids Left: <span style={{ color: '#338BFF' }}>{bidBuddyUser?.availableBids}</span>
                                            </p>
                                        </div>
                                    ) : (
                                        <div className='lg:px-10 mt-5'>
                                            <Button onClick={() => {
                                                // if (auction?.status !== 'ACTIVE') {
                                                //     return toast.error('bid will be available last 9s')
                                                // }
                                                handleBid()
                                            }} className='py-2'>Bid</Button>
                                        </div>
                                    )}

                                    <div className='flex gap-5 justify-between mt-5 lg:px-10'>
                                        <Input
                                            type='number'
                                            onChange={(e) => setNumberOfBids(e.target.value)}
                                            placeholder='Number of bids'
                                            className='border py-3 border-[#9F9F9F] rounded-lg w-full'
                                        />
                                        <Button
                                            onClick={() => {
                                                // if (auction?.status !== 'ACTIVE') {
                                                //     return toast.error('bid will be available last 9s')
                                                // }
                                                if (!numberOfBids) {
                                                    return toast.error('Please input number of bids');
                                                }
                                                if (bidBuddyUser?.isActive) {
                                                    socket.emit('add-bids', { auctionId: id, userId: profile?.data?._id, bids: Number(numberOfBids) });
                                                } else {
                                                    socket.emit('activateBidBuddy', { auctionId: id, userId: profile?.data?._id, totalBids: Number(numberOfBids) });
                                                }
                                            }}
                                        >
                                            {bidBuddyUser?.isActive ? 'Add Bids' : 'Book BidBuddy'}
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <p className='text-[#585858] pt-5 px-10'>
                                BidBuddy is your Automatic Bidding Tool. Book any number of bids. Each bid will be placed for you before the timer reaches zero. The first bid will be placed immediately.
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className='bg-white mt-5 p-5 rounded-md'>
                        <h1 className='font-semibold text-[20px]'>Description: </h1>
                        <p className='text-[#2E2E2E] mt-5'>{auction?.description}</p>
                    </div>
                </div>

                <div className='col-span-12 lg:col-span-2 px-5 lg:px-0'>
                    <p className='font-medium text-[18px] pb-5'>Similar Products:</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4'>
                        {similarProduct?.data?.result?.slice(0, 5)?.map((item, i) => (
                            <UpcommingProduct key={i} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
const calculateTimeLeft = (targetDateTime) => {
    const now = new Date().getTime();
    const timeLeft = targetDateTime - now;
    const totalHours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return {
        total: timeLeft,
        hours: totalHours,
        minutes,
        seconds,
    };
};


