import React, { useEffect, useMemo, useState } from 'react'
import { FaRegStar } from 'react-icons/fa'
import img from '../../assets/watch.png'
import { calculateTimeLeft } from './UpcommingProduct'
import { useNavigate } from 'react-router-dom'
const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const combinedDateTime = new Date(`${product?.activateTime}`);
  // const combinedDateTime = new Date(`${product?.activateTime?.split("T")[0]}T${product?.startingTime?.split(" ")[0]}`);
  const [time, setTime] = useState(product?.time);
  const [countDown, setCountDown] = useState(100);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(combinedDateTime));
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
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.ceil(time) === 1) {
        setTime(9)
      } else (
        setTime(time - .1)
      )
    }, countDown);
    return () => clearInterval(interval);
  }, [countDown, time]);
  useEffect(() => {
    if (time !== product?.time) {
      setTime(product?.time)
    }
  }, [product?.time])
  // console.log(product?.time)
  return (
    <div className='rounded-lg bg-white shadow-sm my-4 relative'>
      <img src={img} className='w-full h-[180px]' alt="" />
      <div style={{
        background: time === 9 ? 'yellow' : ''
      }} className={`text-center space-y-1 py-2 px-5`}>
        <p className='font-medium'>{product?.name}</p>
        <p className='text-[#338BFF] font-medium '> {formatTimeLeft(timeLeft)?.startsWith('-') ? `$${product?.currentPrice}` : `${product?.startingDate?.split("T")[0]} at ${product?.startingTime}`}</p>
        <p className='text-[#2E2E2E]'>{product?.bidHistory[product?.bidHistory?.length - 1]?.user?.name || 'no bid yet'}</p>
        <p className='text-[#585858] font-semibold text-[24px]'>{formatTimeLeft(timeLeft)?.startsWith('-') ? `00:00:0${Math.ceil(time)}` : formatTimeLeft(timeLeft)}</p>
        <button onClick={() => {
          navigate(`/product-details/${product?._id}`)
        }} disabled={!formatTimeLeft(timeLeft)?.startsWith('-')} className='bg-yellow px-14 text-white disabled:bg-gray rounded-md py-2 w-full'>{formatTimeLeft(timeLeft)?.startsWith('-') ? 'Bid' : 'Starting Soon '}</button>
      </div>
      <FaRegStar size={22} className='absolute top-3 right-3 text-yellow' />
    </div>
  )
}

export default ProductCard     