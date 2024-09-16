import React from 'react'
import img from '../../assets/image.png'
const UpcommingProduct = () => {
    return (
        <div className='rounded-lg bg-white shadow-sm my-4'>
            <img src={img} className='w-full h-[150px]' alt="" />
            <div className=' text-center space-y-1 py-2'>
                <p className='font-medium'>Sony 32” W8 Smart TV</p>
                <p className='text-[#338BFF] font-medium '>Today at 02:45 PM</p>
                <p className='text-[#2E2E2E]'>Bid during last 9 seconds</p>
                <p className='text-[#585858] font-semibold text-[ 24px]'>02:48:27</p>
                <button className='bg-[#666666] px-14 text-white rounded-md py-2'>Starting Soon</button>
            </div>
        </div>
    )
}

export default UpcommingProduct