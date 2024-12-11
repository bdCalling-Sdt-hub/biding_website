





// import React, { useEffect, useState } from 'react';
// import { FaRegStar, FaStar } from 'react-icons/fa';
// import { useAddBookmarkMutation, useDeleteBookmarkMutation } from '../../redux/api/bookmarkApis';
// import { Spin } from 'antd';
// import { toast } from 'sonner';
// import { useGetWinnerQuery } from '../../redux/api/winnerApi';
// import { useGetProfileQuery } from '../../redux/api/authApis';
// import { useNavigate } from 'react-router-dom';

// const UpcommingProduct = ({ product, type, BookmarkId }) => {
//     const { data: profile } = useGetProfileQuery();
//     const combinedDateTime = new Date(`${product?.startingDate?.split("T")[0]}T${product?.startingTime?.split(" ")[0]}`);
//     const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(combinedDateTime));
//     const navigate = useNavigate()
//     // Bookmark mutation hooks
//     const [addToBookmark, { isLoading }] = useAddBookmarkMutation();
//     const [remove, { isLoading: isDeleting }] = useDeleteBookmarkMutation();
//     const { data: upcomingData, refetch } = useGetWinnerQuery({ status: "UPCOMING", page: 1 });
//     const [time, setTime] = useState(product?.countdownTime)
//     // Handle bookmark addition
//     const handleAddToBookmark = (id) => {
//         if (!profile?.data?.email) {
//             return toast.error('Please Login First');
//         }
//         if (!localStorage.getItem('token')) {
//             return toast.error('Please login first');
//         }
//         addToBookmark({ auctionId: id }).unwrap()
//             .then((payload) => {
//                 toast.success(payload?.message);
//             }).catch((error) => {
//                 toast.error(error?.data?.message);
//             });
//     };

//     // Handle bookmark removal
//     const handleRemoveBookmark = (id) => {
//         if (!profile?.data?.email) {
//             return toast.error('Please Login First');
//         }
//         if (!id) return;
//         if (!localStorage.getItem('token')) {
//             return toast.error('Please login first');
//         }
//         remove(id).unwrap()
//             .then((payload) => {
//                 toast.success(payload?.message);
//             }).catch((error) => {
//                 toast.error(error?.data?.message);
//             });
//     };

//     // Format the countdown time left
//     const formatTimeLeft = (time) => {
//         return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
//     };

//     // Update countdown timer every second
//     useEffect(() => {
//         const interval = setInterval(() => {
//             const updatedTimeLeft = calculateTimeLeft(combinedDateTime);
//             setTimeLeft(updatedTimeLeft);
//             if (updatedTimeLeft.total <= 0) {
//                 clearInterval(interval);
//             }
//         }, 1000);
//         return () => clearInterval(interval);
//     }, [combinedDateTime]);

//     // Refetch winners when time has passed
//     useEffect(() => {
//         if (type && type === 'bookmark') return;
//         if (formatTimeLeft(timeLeft)?.startsWith('-')) {
//             refetch();
//         }
//     }, [formatTimeLeft(timeLeft), timeLeft, type]);
//     useEffect(() => {
//         if (product?.status !== 'ACTIVE' || time === 0) {
//             return;
//         }
//         const interval = setInterval(() => {
//             setTime(prev => prev - 1);
//         }, 1000);
//         return () => clearInterval(interval);
//     }, [product?.status, time]);
//     return (
//         <div className='rounded-lg bg-white shadow-sm my-4 relative'>
//             {(isLoading || isDeleting) && (
//                 <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
//                     <Spin />
//                 </div>
//             )}
//             <img src={product?.images?.[0]} className='w-full h-[180px] object-contain shadow-sm rounded-md p-1' alt={product?.name} />
//             <div className='text-center space-y-1 py-2'>
//                 <p className='font-medium'>{product?.name}</p>
//                 <p className='text-[#338BFF] font-medium'>
//                     {product?.startingDate?.split("T")[0]} at {product?.startingTime}
//                 </p>
//                 <p className='text-[#2E2E2E]'>Bid during last 9 seconds</p>
//                 <p className='text-[#585858] font-semibold text-[24px]'>
//                     {product?.status === 'ACTIVE' ? `00 :00:0${time}` :
//                         formatTimeLeft(timeLeft)?.startsWith('-') ? '00:00:00' : formatTimeLeft(timeLeft)}
//                 </p>
//                 <div className='px-2 md:px-5'>
//                     <button
//                         onClick={() => navigate(`/product-details/${product?._id}?${product?.status === 'ACTIVE' ? `time=${time}` : ''}`)}
//                         className={`md:px-14 text-white ${product?.status !== 'ACTIVE' ? 'bg-gray' : 'bg-yellow'} rounded-md py-2 w-full whitespace-nowrap`}
//                     >
//                         {product?.status === 'COMPLETED' ? 'Sold' : Number(formatTimeLeft(timeLeft)?.split(":")[2]) < 10 ? 'Bid' : 'Starting Soon'}
//                     </button>
//                 </div>
//             </div>
//             {product?.isBookmark || (type && type === 'bookmark')
//                 ? <FaStar onClick={() => handleRemoveBookmark(product?._id)} className='absolute top-3 right-3 text-yellow cursor-pointer' size={22} />
//                 : <FaRegStar onClick={() => handleAddToBookmark(product?._id)} size={22} className='absolute top-3 right-3 text-yellow cursor-pointer' />
//             }
//             {product?.financeAvailable && (
//                 <span className='absolute top-3 left-3 text-yellow cursor-pointer'>
//                     {/* SVG Icon */}
//                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <g clipPath="url(#clip0_2434_7135)">
//                             <path d="M12.014 4.77405C7.66164 4.77405 2.31165 11.5093 2.31165 16.9887C2.31165 19.0677 3.05147 20.7331 4.5114 21.9393C6.16717 23.3068 8.6912 24 12.0139 24C15.3245 24 17.8414 23.3013 19.4937 21.9226C20.95 20.7077 21.6884 19.0316 21.6884 16.9415C21.6884 11.4835 16.3541 4.77405 12.014 4.77405ZM12.388 14.1851C13.4988 14.7722 14.8815 15.5034 14.8815 16.9527C14.8815 18.2578 14.0006 19.3592 12.803 19.6997V20.0704C12.803 20.5007 12.4539 20.8498 12.0236 20.8498C11.5933 20.8498 11.2442 20.5007 11.2442 20.0704V19.6997C10.0466 19.3592 9.16567 18.2578 9.16567 16.9527C9.16567 16.5224 9.5148 16.1732 9.94511 16.1732C10.3754 16.1732 10.7246 16.5224 10.7246 16.9527C10.7246 17.6692 11.3071 18.2517 12.0236 18.2517C12.7401 18.2517 13.3227 17.6692 13.3227 16.9527C13.3227 16.4422 12.4772 15.9956 11.6592 15.5633C10.5484 14.9762 9.16567 14.245 9.16567 12.7957C9.16567 11.4905 10.0466 10.3892 11.2442 10.0487V9.67798C11.2442 9.24767 11.5933 8.89854 12.0236 8.89854C12.4539 8.89854 12.803 9.24767 12.803 9.67798V10.0487C14.0006 10.3892 14.8815 11.4905 14.8815 12.7957C14.8815 13.226 14.5324 13.5751 14.1021 13.5751C13.6718 13.5751 13.3227 13.226 13.3227 12.7957C13.3227 12.0792 12.7401 11.4966 12.0236 11.4966C11.3071 11.4966 10.7246 12.0792 10.7246 12.7957C10.7246 13.3062 11.5699 13.7527 12.388 14.1851Z" fill="#F3A211" />
//                             <path d="M16.2674 0.963143C15.9071 0.778408 15.4646 0.899674 15.25 1.24327C14.9242 1.76546 14.47 1.89633 14.1463 1.9141C13.583 1.95418 13.0172 1.668 12.625 1.17272C12.0353 0.427266 11.1021 0 10.0654 0C9.0287 0 8.09551 0.427266 7.50582 1.17267C7.33022 1.39392 7.2886 1.69228 7.39622 1.95361C7.48336 2.16493 7.91143 3.15094 8.62205 4.13382C9.74288 3.54952 10.8949 3.21507 12.0139 3.21507C13.1328 3.21507 14.2848 3.54971 15.4052 4.13452C16.1163 3.15137 16.5446 2.16488 16.6317 1.95352C16.786 1.57866 16.6276 1.14835 16.2674 0.963143Z" fill="#F3A211" />
//                         </g>
//                         <defs>
//                             <clipPath id="clip0_2434_7135">
//                                 <rect width="24" height="24" fill="white" />
//                             </clipPath>
//                         </defs>
//                     </svg>
//                 </span>
//             )}
//         </div>
//     );
// };
// export default UpcommingProduct;

// // Helper function to calculate the remaining time
// const calculateTimeLeft = (targetDateTime) => {
//     const now = new Date().getTime();
//     const timeLeft = targetDateTime - now;

//     const totalHours = Math.floor(timeLeft / (1000 * 60 * 60));
//     const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

//     return {
//         total: timeLeft,
//         hours: totalHours,
//         minutes,
//         seconds,
//     };
// };


import React, { useEffect, useMemo, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useAddBookmarkMutation, useDeleteBookmarkMutation } from '../../redux/api/bookmarkApis';
import { Spin } from 'antd';
import { toast } from 'sonner';
import { useGetWinnerQuery } from '../../redux/api/winnerApi';
import { useGetProfileQuery } from '../../redux/api/authApis';
import { useNavigate } from 'react-router-dom';
import { isLessThanTenSeconds } from '../../pages/ProductDetails/ProductDetails';

const UpcommingProduct = ({ product, type, BookmarkId }) => {
    // const { data, isLoading } = useGetAuctionsQuery({ category, searchTerm, financeAvailable: financeAvailable === 'true' ? true : false })//{ status: 'ACTIVE' }
    const { data: profile } = useGetProfileQuery();
    const combinedDateTime = new Date(`${product?.startingDate?.split("T")[0]}T${product?.startingTime?.split(" ")[0]}`);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(combinedDateTime));
    const startingDateTime = useMemo(() => new Date(`${product?.startingDateTime}`), [product?.startingDateTime]);
    const [startTime, setStartTime] = useState(calculateTimeLeft(startingDateTime));
    const [time, setTime] = useState(product?.countdownTime);
    const navigate = useNavigate();

    const [addToBookmark, { isLoading }] = useAddBookmarkMutation();
    const [remove, { isLoading: isDeleting }] = useDeleteBookmarkMutation();
    const { refetch } = useGetWinnerQuery({ status: "UPCOMING", page: 1 });

    // Function to format the countdown timer display
    const formatTimeLeft = (time) => {
        if (time.days > 0) {
            return `${time.days} day ${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
        } else {
            return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
        }
    };

    // Handle bookmark addition
    const handleAddToBookmark = (id) => {
        if (!profile?.data?.email) return toast.error('Please Login First');
        if (!localStorage.getItem('token')) return toast.error('Please login first');
        addToBookmark({ auctionId: id }).unwrap()
            .then((payload) => toast.success(payload?.message))
            .catch((error) => toast.error(error?.data?.message));
    };

    // Handle bookmark removal
    const handleRemoveBookmark = (id) => {
        if (!profile?.data?.email) return toast.error('Please Login First');
        if (!localStorage.getItem('token')) return toast.error('Please login first');
        remove(id).unwrap()
            .then((payload) => toast.success(payload?.message))
            .catch((error) => toast.error(error?.data?.message));
    };

    // Update countdown timer every second
    useEffect(() => {
        const interval = setInterval(() => {
            const updatedTimeLeft = calculateTimeLeft(combinedDateTime);
            setTimeLeft(updatedTimeLeft);
            if (updatedTimeLeft.total <= 0) clearInterval(interval);
        }, 1000);
        return () => clearInterval(interval);
    }, [combinedDateTime]);

    // Refetch upcoming data if time has passed
    useEffect(() => {
        if (type === 'bookmark') return;
        if (formatTimeLeft(timeLeft)?.startsWith('-')) refetch();
    }, [formatTimeLeft(timeLeft), timeLeft, type]);

    // Countdown timer for active products
    useEffect(() => {
        if (product?.status !== 'ACTIVE' || time === 0) return;
        const interval = setInterval(() => setTime(prev => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [product?.status, time]);
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
    return (
        <div className='rounded-lg bg-white shadow-sm my-4 relative'>
            {(isLoading || isDeleting) && (
                <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                    <Spin />
                </div>
            )}
            <img src={product?.images?.[0]} className='w-full h-[180px] object-contain shadow-sm rounded-md p-1' alt={product?.name} />
            <div className='text-center space-y-1 py-2'>
                <p className='font-medium'>{product?.name}</p>
                <p className='text-[#338BFF] font-medium'>
                    {product?.startingDate?.split("T")[0]} at {product?.startingTime}
                </p>
                {/* <p className='text-[#2E2E2E]'>Bid during last 9 seconds</p> */}
                <p className='text-[#585858] font-semibold text-[24px]'>
                    <p className='text-[#585858] font-semibold text-[24px]'>
                        {product?.status === 'ACTIVE' ? isLessThanTenSeconds(formatTimeLeft(timeLeft)) ? `00:00:0${time <= 0 ? '0' : time}` : formatTimeLeft(timeLeft) :
                            formatTimeLeft(startTime)?.startsWith('-') ? isLessThanTenSeconds(formatTimeLeft(timeLeft)) ? `00:00:0${time <= 0 ? '0' : time}` : formatTimeLeft(timeLeft) : formatTimeLeft(startTime)}
                    </p>
                </p>
                <div className='px-2 md:px-5'>
                    <button
                        onClick={() => navigate(`/product-details/${product?._id}?${product?.status === 'ACTIVE' ? `time=${time}` : ''}`)}
                        className={`md:px-14 text-white ${product?.status !== 'ACTIVE' ? 'bg-gray' : 'bg-yellow'} rounded-md py-2 w-full whitespace-nowrap`}
                    >
                        {product?.status === 'COMPLETED' ? 'Sold' : product?.status === 'ACTIVE' ? 'Bid' : 'Starting Soon'}
                    </button>
                </div>
            </div>
            {product?.isBookmark || (type && type === 'bookmark')
                ? <FaStar onClick={() => handleRemoveBookmark(product?._id)} className='absolute top-3 right-3 text-yellow cursor-pointer' size={22} />
                : <FaRegStar onClick={() => handleAddToBookmark(product?._id)} size={22} className='absolute top-3 right-3 text-yellow cursor-pointer' />
            }
            {product?.financeAvailable && (
                <span className='absolute top-3 left-3 text-yellow cursor-pointer'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_2434_7135)">
                            <path d="M12.014 4.77405C7.66164 4.77405 2.31165 11.5093 2.31165 16.9887C2.31165 19.0677 3.05147 20.7331 4.5114 21.9393C6.16717 23.3068 8.6912 24 12.0139 24C15.3245 24 17.8414 23.3013 19.4937 21.9226C20.95 20.7077 21.6884 19.0316 21.6884 16.9415C21.6884 11.4835 16.3541 4.77405 12.014 4.77405ZM12.388 14.1851C13.4988 14.7722 14.8815 15.5034 14.8815 16.9527C14.8815 18.2578 14.0006 19.3592 12.803 19.6997V20.0704C12.803 20.5007 12.4539 20.8498 12.0236 20.8498C11.5933 20.8498 11.2442 20.5007 11.2442 20.0704V19.6997C10.0466 19.3592 9.16567 18.2578 9.16567 16.9527C9.16567 16.5224 9.5148 16.1732 9.94511 16.1732C10.3754 16.1732 10.7246 16.5224 10.7246 16.9527C10.7246 17.6692 11.3071 18.2517 12.0236 18.2517C12.7401 18.2517 13.3227 17.6692 13.3227 16.9527C13.3227 16.4422 12.4772 15.9956 11.6592 15.5633C10.5484 14.9762 9.16567 14.245 9.16567 12.7957C9.16567 11.4905 10.0466 10.3892 11.2442 10.0487V9.67798C11.2442 9.24767 11.5933 8.89854 12.0236 8.89854C12.4539 8.89854 12.803 9.24767 12.803 9.67798V10.0487C14.0006 10.3892 14.8815 11.4905 14.8815 12.7957C14.8815 13.226 14.5324 13.5751 14.1021 13.5751C13.6718 13.5751 13.3227 13.226 13.3227 12.7957C13.3227 12.0792 12.7401 11.4966 12.0236 11.4966C11.3071 11.4966 10.7246 12.0792 10.7246 12.7957C10.7246 13.3062 11.5699 13.7527 12.388 14.1851Z" fill="#F3A211" />
                            <path d="M16.2674 0.963143C15.9071 0.778408 15.4646 0.899674 15.25 1.24327C14.9242 1.76546 14.47 1.89633 14.1463 1.9141C13.583 1.95418 13.0172 1.668 12.625 1.17272C12.0353 0.427266 11.1021 0 10.0654 0C9.0287 0 8.09551 0.427266 7.50582 1.17267C7.33022 1.39392 7.2886 1.69228 7.39622 1.95361C7.48336 2.16493 7.91143 3.15094 8.62205 4.13382C9.74288 3.54952 10.8949 3.21507 12.0139 3.21507C13.1328 3.21507 14.2848 3.54971 15.4052 4.13452C16.1163 3.15137 16.5446 2.16488 16.6317 1.95352C16.786 1.57866 16.6276 1.14835 16.2674 0.963143Z" fill="#F3A211" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2434_7135">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </span>
            )}
        </div>
    );
};
export default UpcommingProduct;

const calculateTimeLeft = (targetDateTime) => {
    // const usTime = new Date(targetDateTime.toLocaleString("en-US", { timeZone: "America/New_York" }));
    const usTime = new Date(targetDateTime);
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTime = new Date(usTime.toLocaleString('en-US', { timeZone: userTimeZone }));
    const now = new Date().getTime();
    const timeLeft = localTime - now;
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
