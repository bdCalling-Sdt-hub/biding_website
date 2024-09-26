import React, { useEffect, useState } from 'react'
import img from '../../assets/image.png'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { useAddBookmarkMutation } from '../../redux/api/bookmarkApis';
import { Spin } from 'antd';
import { toast } from 'sonner';
import { useGetWinnerQuery } from '../../redux/api/winnerApi';
const UpcommingProduct = ({ product }) => {
    // states 
    const combinedDateTime = new Date(`${product?.startingDate?.split("T")[0]}T${product?.startingTime?.split(" ")[0]}`);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(combinedDateTime));
    // query 
    const [addToBookmark, { isLoading }] = useAddBookmarkMutation();
    const { data: upcomingData, refetch } = useGetWinnerQuery({ status: "UPCOMING", page: 1 })
    // handler
    const handleAddToBookmark = (id) => {
        addToBookmark({ auctionId: id }).unwrap()
            .then((payload) => {
                console.log(payload)
                toast.success(payload?.message)
            }).catch((error) => {
                console.log(error)
                toast.error(error?.data?.message)
            })
    }
    // formate time 
    const formatTimeLeft = (time) => {
        return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
    };
    // side effect 

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedTimeLeft = calculateTimeLeft(combinedDateTime);
            setTimeLeft(updatedTimeLeft);
            if (updatedTimeLeft.total <= 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [combinedDateTime]);
    //
    useEffect(() => {
        if (formatTimeLeft(timeLeft)?.startsWith('-')) {
            refetch()
        }
    }, [formatTimeLeft(timeLeft), timeLeft])
    return (
        <div className='rounded-lg bg-white shadow-sm my-4 relative'>
            {
                isLoading && <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center"> <Spin /></div>
            }
            <img src={product?.images[0]} className='w-full h-[180px] object-contain border rounded-md p-1' alt="" />
            <div className=' text-center space-y-1 py-2'>
                <p className='font-medium'>{product?.name}</p>
                <p className='text-[#338BFF] font-medium '>{product?.startingDate?.split("T")[0]} at {product?.startingTime}</p>
                <p className='text-[#2E2E2E]'>Bid during last 9 seconds</p>
                <p className='text-[#585858] font-semibold text-[ 24px]'>{formatTimeLeft(timeLeft)?.startsWith('-') ? '00:00:00' : formatTimeLeft(timeLeft)}</p>
                <button className='bg-[#666666] px-5 md:px-14 text-white rounded-md py-2'>Starting Soon</button>
            </div>
            <button onClick={() => handleAddToBookmark(product?._id)} className='absolute top-3 right-3 text-yellow' >
                {
                    product?.isBookmark ? <FaStar size={22} className='text-yellow' /> : <FaRegStar size={22} className='text-yellow' />
                }
            </button>
        </div>
    )
}
const calculateTimeLeft = (targetDateTime) => {
    const now = new Date().getTime();
    const timeLeft = targetDateTime - now;

    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return {
        total: timeLeft,
        hours,
        minutes,
        seconds,
    };
};

export default UpcommingProduct