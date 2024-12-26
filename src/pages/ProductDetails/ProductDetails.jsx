import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import BackButton from '../../components/ui/BackButton';
import ProductCard from '../../components/ui/ProductCard';
import { IoArrowBackSharp, IoLocationOutline } from 'react-icons/io5';
import { Input, Table } from 'antd';
import Button from '../../components/ui/Button';
import { useSocketContext } from '../../Providers/SocketProviders';
import { useGetProfileQuery } from '../../redux/api/authApis';
import { toast } from 'sonner';
import { useGetSingleAuctionQuery } from '../../redux/api/auctionsApis';
import { useGetWinnerQuery } from '../../redux/api/winnerApi';
import { useMemo } from 'react';
// Table columns definition
const columns = [
    // {
    //     title: 'Bid',
    //     dataIndex: 'bid',
    //     key: 'bid',
    // },
    {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
        render: (user) => (
            <div className="flex items-center">
                <img
                    src={user?.image}
                    alt={user?.name}
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
    const [imageIndex, setImageIndex] = useState(0)
    const { socket } = useSocketContext();
    const location = useLocation()
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
    const { data: profile, isLoading, isFetching } = useGetProfileQuery();
    if (!localStorage.getItem('token')) {
        return navigate('/login', { state: location?.pathname })
    }
    // console.log(auction?.activateTime)
    useEffect(() => {
        setAuction(getSingleAuction?.data);
        // setTime(getSingleAuction?.data?.countdownTime) uniqueBidders
        const filterBidUser = getSingleAuction?.data?.bidBuddyUsers?.filter(item => profile?.data?._id === item?.user);
        setBidBuddyUser(filterBidUser?.[0]);
    }, [getSingleAuction?.data, profile]);
    const combinedDateTime = useMemo(() => new Date(`${auction?.activateTime}`), [auction?.activateTime]);
    const startingDateTime = useMemo(() => new Date(`${auction?.startingDateTime}`), [auction?.startingDateTime]);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(combinedDateTime));
    const [startTime, setStartTime] = useState(calculateTimeLeft(startingDateTime));

    const formatTimeLeft = (time) => {
        if (time.days > 0) {
            return `${time.days} day ${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
        } else {
            return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
        }
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
    }, [combinedDateTime, formatTimeLeft(startTime)]);

    useEffect(() => {
        const interval2 = setInterval(() => {
            const updatedTimeLeft = calculateTimeLeft(startingDateTime);
            setStartTime(updatedTimeLeft);
            if (updatedTimeLeft.total <= 0) {
                clearInterval(interval2);
            }
        }, 1000);
        return () => clearInterval(interval2);
    }, [startingDateTime, formatTimeLeft(startTime)]);

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
                name: bidder?.username,
                image: bidder?.profile_image,
            },
            time: formattedTime,
        };
    });

    // Manual bid handler
    const handleBid = () => {
        if (!profile?.data?._id) {
            return toast.error('please login first')
        }
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

    // Timer logic for auction countdown activateTime startingDateTime

    // console.log(getSingleAuction?.data?.status, profile?.data?._id, getSingleAuction?.data?.bidHistory?.[auction?.bidHistory?.length - 1]?.user)
    // console.log(timeLeft)

    useEffect(() => {
        const handlePopState = () => {
            navigate('/');
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);
    // console.log(auction?.bidHistory)
    useEffect(() => {
        if (isLessThanTenSeconds(formatTimeLeft(timeLeft)) && time === 0) {
            setTime(9)
        }
    }, [formatTimeLeft(timeLeft)])
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
                                <img src={auction?.images?.[imageIndex] ?? 'default_image_url'} className='w-full rounded-md' alt="" />
                            </div>
                            <div className='flex justify-between items-center mt-5 gap-4'>
                                {[0, 1, 2, 3].map((i) => (
                                    <div onClick={() => setImageIndex(i)} className='h-[80px] w-full cursor-pointer' key={i}>
                                        <img src={auction?.images?.[i] ?? 'default_image_url'} className='rounded-md h-[120px]' alt="" />
                                    </div>
                                ))}
                            </div>
                            {/* <div className='bg-white rounded-md mt-14 py-2'>
                                <h1 className='text-[#2E2E2E] pb-2 font-medium mt-5'>Other bidders in this auction</h1>
                                <div className='flex flex-wrap items-center gap-5 ml-2'>
                                    {auction?.uniqueBidders?.slice(0, 14).map((user, index) => (
                                        <img key={index} src={user?.profile_image} className='rounded-full w-[80px] h-[80px]' alt="" />
                                    ))}
                                </div>
                            </div> */}
                        </div>
                        <div className='bg-white py-5 px-8 w-full rounded-md'>
                            <h1 className='text-[26px] font-semibold'>{auction?.name}</h1>
                            <div className='flex justify-between py-5'>
                                <p className='font-semibold text-2xl'>Current Bid:</p>
                                <div className='text-[#338BFF] text-[26px] font-semibold flex justify-end items-center'>{auction?.financeAvailable ?
                                    <p style={{
                                        color: '#000000'
                                    }} className='text-base font-normal mr-3 inline-block'>(finance available)</p>
                                    : ''}
                                    ${Number(auction?.bidHistory?.[auction?.bidHistory?.length - 1]?.bidAmount).toFixed(2) ?? '0'}
                                </div>
                            </div>
                            {
                                auction?.financeAvailable && <div style={{
                                    background: 'black',
                                    color: '#FFFFFF'
                                }} className='flex justify-between items-center gap-2 p-2 rounded-md mb-4'>
                                    <p>Total Months For Financing: <span className='text-yellow'>{auction?.totalMonthForFinance}</span></p>
                                    <p>Per Month : <span className='text-yellow'>${Number((auction?.bidHistory?.[auction?.bidHistory?.length - 1]?.bidAmount ?? 0) / auction?.totalMonthForFinance).toFixed(2)}</span></p>
                                </div>
                            }
                            <p>Current Highest Bidder</p>
                            {auction?.bidHistory?.length < 1 ? (
                                <p>No bid yet!</p>
                            ) : (
                                <div className='flex items-center gap-5 mt-5 mb-5'>
                                    {/* <img src={auction?.bidHistory?.[auction?.bidHistory?.length - 1]?.profile_image ?? 'default_profile_image_url'} className='rounded-full h-[150px] w-[150px]' alt="" /> */}
                                    <div>
                                        <p className='font-semibold text-[20px]'>{auction?.bidHistory?.[auction?.bidHistory?.length - 1]?.name || 'name'}</p>
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
                                        {
                                            auction?.status !== 'COMPLETED' && <h1 className='text-[36px] font-medium text-[#338BFF]'>
                                                {auction?.status === 'ACTIVE' ? isLessThanTenSeconds(formatTimeLeft(timeLeft)) ? `00:00:0${time <= 0 ? '0' : time}` : formatTimeLeft(timeLeft) :
                                                    formatTimeLeft(startTime)?.startsWith('-') ? isLessThanTenSeconds(formatTimeLeft(timeLeft)) ? `00:00:0${time <= 0 ? '0' : time}` : formatTimeLeft(timeLeft) : formatTimeLeft(startTime)}</h1>
                                        }

                                        <p>
                                            {auction?.status === 'ACTIVE' || isLessThanTenSeconds(formatTimeLeft(timeLeft)) ? 'Time Left' : 'Time Left to start the auction'}
                                        </p>
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
                                    {
                                        auction?.status === 'ACTIVE' && <div className='flex gap-5 justify-between mt-5 lg:px-10'>
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
                                                    if (!profile?.data?._id) {
                                                        return toast.error('please login first')
                                                    }
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
                                                {bidBuddyUser?.isActive ? 'Add Bids' : 'Auto Bid Tool'}
                                            </Button>
                                        </div>
                                    }

                                </div>
                            )}

                            <p className='text-[#585858] pt-5 px-10'>
                                The Auto Bid Tool makes bidding easy by automating the process for you. Enter the number of bids you want, and the tool will place them on your behalf until your set limit is reached or the timer runs out. The first bid is placed instantly, so you can stay in the auction without constantly keeping track.
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className='bg-white mt-5 p-5 rounded-md'>
                        <h1 className='font-semibold text-[20px]'>Description: </h1>
                        <div dangerouslySetInnerHTML={{ __html: auction?.description }}>
                        </div>
                    </div>
                </div>
                {/* UpcommingProduct */}
                <div className='col-span-12 lg:col-span-2 px-5 lg:px-0'>
                    <p className='font-medium text-[18px] pb-5'>Similar Products:</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4'>
                        {similarProduct?.data?.result?.slice(0, 5)?.map((item, i) => (
                            <ProductCard key={i} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProductDetails;
// const calculateTimeLeft = (targetDateTime) => {
//     // console.log(`targetDateTime`,targetDateTime)
//     const ukTime = targetDateTime.toLocaleString("en-GB", { timeZone: "Europe/London" });
//     const now = new Date().getTime();
//     const timeLeft = targetDateTime - now;

//     const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
//     return {
//         total: timeLeft,
//         days,
//         hours,
//         minutes,
//         seconds,
//     };
// };




const calculateTimeLeft = (targetDateTime) => {
    // const usTime = new Date(targetDateTime.toLocaleString("en-US", { timeZone: "America/New_York" }));
    // const usTime = new Date(targetDateTime);
    // const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const localTime = new Date(usTime.toLocaleString('en-US', { timeZone: userTimeZone }));
    const now = new Date().getTime();
    const timeLeft = targetDateTime - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return {
        total: timeLeft,
        days,
        hours,
        minutes,
        seconds,
    };
};

export function isLessThanTenSeconds(timeStr) {
    const parts = timeStr.split(':').map(Number);
    let hours, minutes, seconds;
    if (parts.length === 3) {
        [hours, minutes, seconds] = parts;
    } else if (parts.length === 4) {
        const days = parts[0];
        [hours, minutes, seconds] = parts.slice(1);
        if (days > 0) return false;
    }
    return hours <= 0 && minutes <= 0 && seconds < 10;
}
export function isLessThanTenMinute(timeStr) {
    const parts = timeStr.split(':').map(Number);
    let hours, minutes, seconds;
    if (parts.length === 3) {
        [hours, minutes, seconds] = parts;
    } else if (parts.length === 4) {
        const days = parts[0];
        [hours, minutes, seconds] = parts.slice(1);
        if (days > 0) return false;
    }
    return hours <= 0 && minutes <= 9 && seconds < 60;
}


// const calculateTimeLeft = (targetDateTime) => {
//     // const usTime = new Date(targetDateTime.toLocaleString("en-US", { timeZone: "America/New_York" }));
//     const usTime = new Date(targetDateTime);
//     const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//     const localTime = new Date(usTime.toLocaleString('en-US', { timeZone: userTimeZone }));
//     const now = new Date().getTime();
//     const timeLeft = localTime - now;
//     const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
//     return {
//         total: timeLeft,
//         days,
//         hours,
//         minutes,
//         seconds,
//     };
// };

// export function isLessThanTenSeconds(timeStr) {
//     const parts = timeStr.split(':').map(Number);
//     let hours, minutes, seconds;
//     if (parts.length === 3) {
//         [hours, minutes, seconds] = parts;
//     } else if (parts.length === 4) {
//         const days = parts[0];
//         [hours, minutes, seconds] = parts.slice(1);
//         if (days > 0) return false;
//     }
//     return hours <= 0 && minutes <= 0 && seconds < 10;
// }

