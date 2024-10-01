import React, { useEffect, useState } from 'react'
import BackButton from '../../components/ui/BackButton'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/ui/ProductCard'
import { IoLocationOutline } from 'react-icons/io5'
import { Input, Table } from 'antd'
import Button from '../../components/ui/Button'
import { useSocketContext } from '../../Providers/SocketProviders'
import { useGetProfileQuery } from '../../redux/api/authApis'
import { toast } from 'sonner'
import { useGetSingleAuctionQuery } from '../../redux/api/auctionsApis'
import { useGetWinnerQuery } from '../../redux/api/winnerApi'
import UpcommingProduct from '../../components/ui/UpcommingProduct'



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
    const { socket } = useSocketContext()
    const { id } = useParams()
    const [auction, setAuction] = useState({})
    const [numberOfBids, setNumberOfBids] = useState(0)

    const { data: getSingleAuction } = useGetSingleAuctionQuery(id);
    const { data: similarProduct } = useGetWinnerQuery({ category: getSingleAuction?.data?.category || null })
    // console.log('similarProduct', similarProduct)
    useEffect(() => {
        setAuction(getSingleAuction?.data)
    }, [getSingleAuction?.data])

    /** Get unique bidder profile image */
    const unniqueUser = auction?.bidHistory?.filter((user, index, self) => index === self.findIndex((u) => u?.user?._id === user?.user?._id))


    /** Current height bider table data format */
    const heightBidderDataFormat = auction?.bidHistory?.slice(-2)?.map((bidder, i) => {
        const formattedTime = new Date(bidder?.time).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        return {
            key: i + 1,
            bid: bidder?.bidAmount,
            user: {
                name: bidder?.user?.name,
                image: bidder?.user?.profile_image,
            },
            time: formattedTime,
        }
    })

    const { data: profile } = useGetProfileQuery()
    const handleBid = () => {

        if (!socket) {
            return
        }
        socket.emit("place-manual-bid", { auction_id: id, user_id: profile?.data?._id });
    }
    useEffect(() => {
        if (!socket) {
            return
        }
        socket.emit('joinAuction', (id))
        socket.on("bidHistory", (updatedBidHistory) => {
            // console.log('sldfh9yadhfu9asd7yuasdbh fuyasdg ft7sdf rtvafd', updatedBidHistory)
            setAuction(updatedBidHistory?.updatedAuction)
        })
        socket.on('socket-error', (error) => {
            toast.error(error?.errorMessage || 'something went wrong')
        })
    }, [socket, id])

    return (
        <div>
            <BackButton pageName={"Product Details"} />
            <div className='grid grid-cols-12 gap-5'>
                <div className=' col-span-12 lg:col-span-10 mx-5 lg:mx-0'>
                    <div className='flex  flex-col lg:flex-row justify-between gap-10'>
                        <div className='w-full '>
                            <div>
                                <img src={auction?.images?.[0]} className='w-full rounded-md' alt="" />
                            </div>
                            <div className='flex justify-between mt-2 gap-2 '>
                                <div className=' h-[80px]'>
                                    <img src={auction?.images?.[1]} className='w-[110px] rounded-md h-[120px] md:w-full object-contain' alt="" />
                                </div>
                                <div className=' h-[80px] '>
                                    <img src={auction?.images?.[1]} className='w-[110px] rounded-md h-[120px] md:w-full object-contain' alt="" />
                                </div>
                                <div className=' h-[80px] '>
                                    <img src={auction?.images?.[1]} className='w-[110px] rounded-md h-[120px] md:w-full object-contain' alt="" />
                                </div>

                            </div>
                            <div className='bg-white rounded-md  mt-14 py-2  '>
                                <h1 className='text-[#2E2E2E] pb-2 font-medium mt-5'>Other bidders in this auction</h1>
                                <div className='flex flex-wrap items-center gap-5 ml-2'>
                                    {
                                        unniqueUser?.slice(0, 14).map(user => <img src={user?.user?.profile_image} className='rounded-full' alt="" />)
                                    }

                                </div>

                            </div>
                        </div>
                        <div className='bg-white py-5 px-8 w-full rounded-md'>
                            <h1 className='text-[26px] font-semibold'>{auction?.name}</h1>
                            <div className='flex justify-between py-5'>
                                <p>Current BID:</p>
                                <p className='text-[#338BFF] text-[26px] font-semibold'>$ {auction?.bidHistory?.[auction.bidHistory.length - 1]?.bidAmount}</p>
                            </div>
                            <p>Current Highest Bidder</p>
                            <div className='flex items-center gap-5 mt-5 mb-5'>
                                <img src={auction?.bidHistory?.[auction?.bidHistory?.length - 1]?.user?.profile_image} className='rounded-full' alt="" />
                                <div>
                                    <p className='font-semibold text-[20px]'>{auction?.bidHistory?.[auction?.bidHistory?.length - 1]?.user?.name}</p>
                                    <p className='flex items-center gap-2'> <IoLocationOutline className='text-yellow' /> {auction?.bidHistory?.[auction?.bidHistory?.length - 1]?.user?.location || 'Location Not Available'} </p>
                                </div>
                            </div>


                            {/* Top bidder table */}
                            <Table columns={columns} dataSource={heightBidderDataFormat?.reverse()} size="middle" pagination={false} />

                            <div className='text-center mt-5'>
                                <h1 className='text-[36px] font-medium text-[#338BFF]'>00:00:09</h1>
                                <p>Time Left</p>
                            </div>


                            <div className='flex gap-5 justify-between mt-5 lg:px-10'>
                                <Input type='number' onChange={(e) => {
                                    setNumberOfBids(e.target.value)
                                }} placeholder='number of bids' className='border py-3 border-[#9F9F9F] rounded-lg w-full text-[#9F9F9F] hover:bg-yellow hover:text-white ' />
                                <Button onClick={() => {
                                    if (!numberOfBids) {
                                        toast.error('Please input number of bids')
                                    }
                                    socket.emit('activateBidBuddy', { auctionId: id, userId: profile?.data?._id, totalBids: Number(numberOfBids) })
                                }} className=''>Book BidBuddy</Button>
                                <Button onClick={() => {
                                    handleBid()
                                }} className=''>manual Bid</Button>
                            </div>
                            <p className='text-[#585858] pt-5 px-10'>BidBuddy is your Automatic Bidding Tool. Book any number of bids. Each bid will be placed for you before the timer reaches zero. The first bid will be placed immediately.</p>

                        </div>
                    </div>

                    {/* description */}
                    <div className='bg-white mt-5 p-5 rounded-md'>
                        <h1 className='font-semibold text-[20px]'>Description: </h1>
                        <p className='text-[#2E2E2E] mt-5'>{auction?.description
                        }</p>
                        {/* <p className='my-5 font-medium'>{auction?.name}
                        </p> */}

                        {/* <div className='space-y-2'>
                            <li>Redefined the design in more polished way and solid construction with strong material
                            </li>
                            <li>The innovative dynamic island punch hole manifests important notifications
                            </li>
                            <li>Emergency SOS via satellite to lend a hand in an urgent situation anywhere
                            </li>
                            <li>Triple camera with bigger lenses for capturing jaw-dropping pictures
                            </li>
                            <li>Action mode  comes to bring smoothness and stability to videos
                            </li>
                        </div> */}
                    </div>
                </div>

                <div className='col-span-12 lg:col-span-2  px-5 lg:px-0'>
                    <p className='font-medium text-[18px] pb-5'>Similar Products:</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4'>
                        {
                            similarProduct?.data?.result?.slice(0, 5)?.map((item, i) => <UpcommingProduct key={i} product={item} />)
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductDetails 