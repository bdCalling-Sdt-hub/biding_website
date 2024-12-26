
import React, { useEffect, useMemo, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAddBookmarkMutation, useDeleteBookmarkMutation } from '../../redux/api/bookmarkApis';
import { toast } from 'sonner';
import { isLessThanTenMinute, isLessThanTenSeconds } from '../../pages/ProductDetails/ProductDetails';
import { useGetProfileQuery } from '../../redux/api/authApis';
import { useSocketContext } from '../../Providers/SocketProviders';

const ProductCard = ({ product }) => {
  const { socket } = useSocketContext();
  // Get profile data
  const { data: profile, isLoading, isFetching } = useGetProfileQuery();
  const navigate = useNavigate();
  const combinedDateTime = useMemo(() => new Date(`${product?.activateTime}`), [product?.activateTime]);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(combinedDateTime));
  const startingDateTime = useMemo(() => new Date(`${product?.startingDateTime}`), [product?.startingDateTime]);
  const [startTime, setStartTime] = useState(calculateTimeLeft(startingDateTime));
  const [blink, setBlink] = useState(false);
  const [time, setTime] = useState(product?.countdownTime);

  // Time formatting function
  const formatTimeLeft = (time) => {
    if (time.days > 0) {
      return `${time.days} ${Number(time.days) > 1 ?'Days':'Day'}  ${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
    } else {
      return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
    }
  };
  const [addToBookmark] = useAddBookmarkMutation();
  const [remove] = useDeleteBookmarkMutation();

  // Time update effect with consistent format and blinking effect
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
  const handleAddToBookmark = (id) => {
    if (!localStorage.getItem('token')) {
      return toast.error('Please login first');
    }
    addToBookmark({ auctionId: id }).unwrap()
      .then((payload) => {
        toast.success(payload?.message);
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      });
  };

  useEffect(() => {
    if (product?.status !== 'ACTIVE' || time === 0) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    let timeoutId;
    if (time === 9) {
      setBlink(true);
      timeoutId = setTimeout(() => {
        setBlink(false);
      }, 200);
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, [product?.status, time]);

  const handleRemoveBookmark = (id) => {
    if (!id) return;
    if (!localStorage.getItem('token')) {
      return toast.error('Please login first');
    }
    remove(id).unwrap()
      .then((payload) => {
        toast.success(payload?.message);
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      });
  };
  // console.log(product?._id)
  const handleBid = () => {
    if (!profile?.data?._id) {
      return toast.error('please login first')
    }
    if (!socket) {
      return;
    }
    socket.emit("place-manual-bid", { auction_id: product?._id, user_id: profile?.data?._id });
  };
  useEffect(() => {
    if (isLessThanTenSeconds(formatTimeLeft(timeLeft)) && time === 0) {
      setTime(9)
    }
  }, [formatTimeLeft(timeLeft)])
  return (
    <div className='rounded-lg bg-white shadow-sm my-4 relative flex flex-col justify-between'>
      <div>
        <img onClick={() => {
          navigate(`/product-details/${product?._id}?${product?.status === 'ACTIVE' ? `time=${time}` : ''}`)
          window.scrollTo(0, 0)
        }} src={product?.images[0] || 'default_image_url'} className='w-full h-[180px] object-contain cursor-pointer' alt="Product" />
        <div
          style={{ background: blink ? '#F3A211' : '' }}
          className='text-center space-y-1 py-2 px-5'
        >
          <p className='font-medium text-2xl'>{product?.name}</p>
          {/* <p className='text-[#338BFF] font-medium'>
            {formatTimeLeft(timeLeft)?.startsWith('-') || Number(formatTimeLeft(timeLeft).split(':')[2]) < 10
              ? `$${Number(product?.currentPrice || 0).toFixed(2)}`
              : `${product?.startingDate?.split("T")[0]} at ${product?.startingTime}`}
          </p> */}
          <p className='text-[green] font-medium'>
            {product?.bidHistory?.length > 0 && product?.bidHistory[product?.bidHistory?.length - 1]?.user?.username ? <span className='text-2xl font-bold'> ${product?.currentPrice?.toFixed(2)}</span> : <span className='text-[#2E2E2E]'>No bid yet</span>}
          </p>
          {
            product?.bidHistory?.length > 0 && product?.bidHistory[product?.bidHistory?.length - 1]?.user?.username && <p className='text-[#2E2E2E] font-medium'>
              {product?.bidHistory[product?.bidHistory?.length - 1]?.user?.username}
            </p>
          }
          {
            product?.status !== 'COMPLETED' && product?.status === 'ACTIVE' ? <p className='text-[#074799] font-semibold'>Auction Ends in :</p> : <p className='text-[#074799] font-semibold'>Auction Starts in :</p>
          }
          {product?.status !== 'COMPLETED' && (
            <p className={` font-semibold text-[24px] $${isLessThanTenMinute(formatTimeLeft(timeLeft)) ? 'font-bold text-[#FF0000]' : 'text-[#585858]'}`}>
              {product?.status === 'ACTIVE' ? isLessThanTenSeconds(formatTimeLeft(timeLeft)) ? `00:00:0${time <= 0 ? '0' : time}` : formatTimeLeft(timeLeft) :
                formatTimeLeft(startTime)?.startsWith('-') ? isLessThanTenSeconds(formatTimeLeft(timeLeft)) ? `00:00:0${time <= 0 ? '0' : time}` : formatTimeLeft(timeLeft) : formatTimeLeft(startTime)}
            </p>
          )}
        </div>
      </div>
      <div className='p-2 md:p-5'>
        <button disabled={product?.status !== 'ACTIVE'}
          onClick={() => {
            handleBid()
          }}
          className={`md:px-14 text-white ${product?.status == 'ACTIVE' ? ' bg-yellow' : product?.status == 'COMPLETED' ? 'bg-[#FC8F54]' : 'bg-gray'} rounded-md py-2 w-full whitespace-nowrap`}
        >
          {product?.status === 'COMPLETED' ? 'Sold' : product?.status === 'ACTIVE' ? 'Bid' : 'Starting Soon'}
        </button>
      </div>
      {product?.isBookmark
        ? <FaStar onClick={() => handleRemoveBookmark(product?._id)} className='absolute top-3 right-3 text-yellow cursor-pointer' size={22} />
        : <FaRegStar onClick={() => handleAddToBookmark(product?._id)} size={22} className='absolute top-3 right-3 text-yellow cursor-pointer' />
      }
      {product?.financeAvailable && (
        <span className='absolute top-3 left-3 text-yellow cursor-pointer'>
          {/* SVG Icon Content */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* SVG Icon Content */}
          </svg>
        </span>
      )}
    </div>
  );
};

export default ProductCard;

// const calculateTimeLeft = (targetDateTime) => {
//   const now = new Date().getTime();
//   const timeLeft = targetDateTime - now;

//   const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

//   return {
//     total: timeLeft,
//     days,
//     hours,
//     minutes,
//     seconds,
//   };
// };
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
