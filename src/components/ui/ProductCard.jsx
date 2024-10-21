import React, { useEffect, useMemo, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAddBookmarkMutation, useDeleteBookmarkMutation } from '../../redux/api/bookmarkApis';
import { useGetProfileQuery } from '../../redux/api/authApis';
import { toast } from 'sonner';

const ProductCard = ({ product }) => {
  const { data: profile } = useGetProfileQuery();
  const navigate = useNavigate();
  const combinedDateTime = useMemo(() => new Date(`${product?.activateTime}`), [product?.activateTime]);
  const [time, setTime] = useState(product?.time);
  const [countDown, setCountDown] = useState(100);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(combinedDateTime));

  // Memoized formatTimeLeft
  const formatTimeLeft = useMemo(() => (time) => {
    return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
  }, []);

  const [addToBookmark, { isLoading }] = useAddBookmarkMutation();
  const [remove, { isLoading: isDeleting }] = useDeleteBookmarkMutation();

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
    if (time === 0) {
      return
    }
    const countDownInterval = setInterval(() => {
      setTime(prevTime => (Math.ceil(prevTime) === 0 ? 9 : prevTime - 0.1));
    }, countDown);
    return () => clearInterval(countDownInterval);
  }, [countDown, time]);

  useEffect(() => {
    if (time !== product?.time) {
      setTime(product?.time);
    }
  }, [product?.time]);

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
  return (
    <div className='rounded-lg bg-white shadow-sm my-4  relative flex flex-col justify-between'>
      <div>
        <img src={product?.images[0]} className='w-full h-[180px]' alt="" />
        <div style={{
          background: (formatTimeLeft(timeLeft)?.startsWith('-') && product?.status !== 'COMPLETED' && time === 9) ? '#F3A211' : ''
        }} className={`text-center space-y-1 py-2 px-5`}>
          <p className='font-medium'>{product?.name}</p>
          <p className='text-[#338BFF] font-medium '>{formatTimeLeft(timeLeft)?.startsWith('-') ? `$${product?.currentPrice}` : `${product?.startingDate?.split("T")[0]} at ${product?.startingTime}`}</p>
          <p className='text-[#2E2E2E]'>{product?.bidHistory[product?.bidHistory?.length - 1]?.user?.name || 'no bid yet'}</p>
          {
            product?.status !== 'COMPLETED'
              ? <p className='text-[#585858] font-semibold text-[24px]'>{formatTimeLeft(timeLeft)?.startsWith('-') ? `00:00:0${Math.ceil(time).toString().startsWith('-') ? '0' : Math.ceil(time)}` : formatTimeLeft(timeLeft)}</p>
              : <p></p>
          }
        </div>
      </div>
      <div className='p-2 md:p-5'>
        <button onClick={() => navigate(`/product-details/${product?._id}?time=${Math.floor(time)}`)}
          disabled={!formatTimeLeft(timeLeft)?.startsWith('-')}
          className='bg-yellow md:px-14  text-white disabled:bg-gray rounded-md py-2 w-full'>
          {product?.status === 'COMPLETED' ? 'Sold' : formatTimeLeft(timeLeft)?.startsWith('-') ? 'Bid' : 'Starting Soon'}
        </button>
      </div>
      {
        product?.isBookmark
          ? <FaStar onClick={() => handleRemoveBookmark(product?._id)} className='absolute top-3 right-3 text-yellow cursor-pointer' size={22} />
          : <FaRegStar onClick={() => handleAddToBookmark(product?._id)} size={22} className='absolute top-3 right-3 text-yellow cursor-pointer' />
      }
    </div>
  );
};

export default ProductCard;

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
