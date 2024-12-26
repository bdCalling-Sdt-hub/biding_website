import React, { useEffect, useState } from 'react'
import BackButton from '../../components/ui/BackButton'
import { useSocketContext } from '../../Providers/SocketProviders'
import { useGetAuctionsQuery } from '../../redux/api/auctionsApis'
import ProductCard from '../../components/ui/ProductCard'
import { useGetWinnerQuery } from '../../redux/api/winnerApi'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const Auctions = () => {
    const [categoryName, setCategoryName] = useState(new URLSearchParams(window.location.search).get('categoryName') || null)
    const category = new URLSearchParams(window.location.search).get('category') || null
    const financeAvailable = new URLSearchParams(window.location.search).get('financeAvailable') || false
    const [searchTerm, setSearchTerm] = useState(new URLSearchParams(window.location.search).get('searchTerm') || null)
    const { socket } = useSocketContext()
    const [auctionsData, setAuctionData] = useState({
        data: [],
        updatedCount: 0
    })
    const { data, isLoading } = useGetAuctionsQuery({ category, searchTerm, financeAvailable: financeAvailable === 'true' ? true : false })//{ status: 'ACTIVE' }
    const [socketData, setSocketData] = useState([])

    useEffect(() => {
        if (!data?.data?.result) {
            return
        }
        const addSerial = data?.data?.result?.map((item, i) => ({
            ...item,
            serial: i + 1,
            time: 9,
            key: item?._id + 1,
            count: i + 1
        }))
        setAuctionData({ data: addSerial, updatedCount: 0 })//auctionsData?.updatedCount + 1
    }, [data?.data])
    useEffect(() => {
        if (!socket) {
            return
        }
        socket.on("updated-auction", (updatedBidHistory) => {
            const updatedAuctions = {
                ...updatedBidHistory?.updatedAuction,
                bidHistory: updatedBidHistory?.updatedAuction?.bidHistory.map(item => {
                    return {
                        user: {
                            ...item
                        }
                    }
                })
            }
            setSocketData([...socketData, updatedAuctions])
        })
        socket.on('socket-error', (error) => {
            toast.error(error?.errorMessage || 'something went wrong')
        })
    }, [socket])
    useEffect(() => {
        let perviousData = auctionsData?.data
        auctionsData?.data?.map(item => {
            socketData?.map(data => {
                if (item?._id === data?._id) {
                    const formateData = {
                        serial: item?.serial,
                        ...data,
                        time: 9,
                        key: item?._id + Number(item?.count + 1),
                        count: item?.count + 1
                    }
                    perviousData.splice(item?.serial - 1, 1, formateData)
                    setAuctionData({ data: perviousData, updatedCount: auctionsData?.updatedCount + 1 })
                }
            })
        })
    }, [socketData])
    return (
        <div className='py-10'>
            <div className='flex justify-between items-center'>
                <BackButton pageName={`Auctions ${categoryName ? `/ ${categoryName}` : ''}`} />
                {/* <Link to={`/auctions`} className='text-yellow flex items-center gap-1 font-medium cursor-pointer'>See More <IoIosArrowForward /></Link> */}
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mx-2 md:mx-0'>
                {
                    isLoading ? <div className=' flex items-center justify-center col-span-2 md:col-span-4'><Spin size='large' /></div> : auctionsData?.data?.map(item => <ProductCard key={item?.key} product={item} />)
                }
            </div>
        </div>
    )
}

export default Auctions
