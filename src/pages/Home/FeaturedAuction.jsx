import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import HomeContentHeading from '../../components/ui/HomeContentHeading'
import { useSocketContext } from '../../Providers/SocketProviders'
import { useGetAuctionsQuery } from '../../redux/api/auctionsApis'
import ProductCard from '../../components/ui/ProductCard'

const FeaturedAuction = () => {
    const { socket } = useSocketContext()
    const [auctionsData, setAuctionData] = useState([])
    const { data } = useGetAuctionsQuery()
    const [socketData, setSocketData] = useState([])
    useEffect(() => {
        if (!data?.data?.result) {
            return
        }
        const addSerial = data?.data?.result?.slice(0, 4)?.map((item, i) => ({
            ...item,
            serial: i + 1,
            time: 9
        }))
        setAuctionData(addSerial)
    }, [data?.data])
    useEffect(() => {
        if (!socket) {
            return
        }
        socket.on("updated-auction", (updatedBidHistory) => {
            console.log('updatedBidHistory', updatedBidHistory)
            Array.isArray(updatedBidHistory?.auction) ? setSocketData([...socketData, ...updatedBidHistory?.auction]) : setSocketData([...socketData, updatedBidHistory?.auction])
        })
        socket.on('socket-error', (error) => {
            toast.error(error?.errorMessage || 'something went wrong')
            console.log('socket-error', error)
        })
    }, [socket])

    useEffect(() => {
        let perviousData = auctionsData
        auctionsData?.map(item => {
            socketData?.map(data => {
                if (item?._id === data?._id) {
                    const formateData = {
                        serial: item?.serial,
                        ...data,
                        time: 4
                    }
                    perviousData.splice(item?.serial - 1, 1, formateData)
                    console.log('perviousData', perviousData)
                    console.log('auctionsData', auctionsData)
                    setAuctionData(perviousData)
                }
            })
        })
    }, [socketData])
    return (
        <div className='py-10'>
            <div className='flex justify-between items-center'>
                <HomeContentHeading title={'Featured Auction'} />
                <p className='text-yellow flex items-center gap-1 font-medium cursor-pointer'>See More <IoIosArrowForward /></p>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mx-2 md:mx-0'>
                {
                    auctionsData?.map(item => <ProductCard key={item?._id} product={item} />)
                }
            </div>
        </div>
    )
}

export default FeaturedAuction