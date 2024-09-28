import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import HomeContentHeading from '../../components/ui/HomeContentHeading'
import UpcommingProduct from '../../components/ui/UpcommingProduct'
import { useSocketContext } from '../../Providers/SocketProviders'
import { useGetAuctionsQuery } from '../../redux/api/auctionsApis'
import ProductCard from '../../components/ui/ProductCard'

const FeaturedAuction = () => {
    const { socket } = useSocketContext()
    const [auctionsData, setAuctionData] = useState([])
    const { data } = useGetAuctionsQuery()
    useEffect(() => {
        if (!data?.data?.result) {
            return
        }
        const addSerial = data?.data?.result?.slice(0, 4)?.map((item, i) => ({
            ...item,
            serial: i + 1
        }))
        setAuctionData(addSerial)
    }, [data?.data])

    return (
        <div className='py-10'>
            <div className='flex justify-between items-center'>
                <HomeContentHeading title={'Featured Auction'} />
                <p className='text-yellow flex items-center gap-1 font-medium cursor-pointer'>See More <IoIosArrowForward /></p>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mx-2 md:mx-0'>
                {
                    auctionsData?.map(item => <ProductCard key={item?.serial} product={item} />)
                }
            </div>
        </div>
    )
}

export default FeaturedAuction