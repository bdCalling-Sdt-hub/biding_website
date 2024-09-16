import React from 'react'
import img from '../../assets/image.png'
import UpcommingProduct from '../../components/ui/UpcommingProduct'
import { Link } from 'react-router-dom'
import { IoArrowBackSharp } from 'react-icons/io5'
import { MdAccessTime } from 'react-icons/md'
import NotificationCard from '../../components/ui/NotificationCard'
const Notification = () => {
    const product = [1, 2, 3]
    return (
        <div>
            <div className='py-3 flex items-center gap-2'>
                <Link to={-1}><IoArrowBackSharp className='text-yellow' /></Link>
                <p>Home / Notification</p>
            </div>
         


            <div className='grid grid-cols-12 justify-between gap-5'>
                <div className='col-span-12 lg:col-span-10 bg-white rounded-lg p-4'>
                    <h1 className='text-[24px] font-medium pb-4'>Notification</h1>
                    {product?.map((product, index) => (
                        <NotificationCard key={index} />
                    ))}
                </div>

                <div className='col-span-12 lg:col-span-2 px-2 lg:px-0'>
                    <p className='font-medium text-[18px] pb-5'>Upcoming Auction:</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                        {product?.map((product, index) => (
                            <UpcommingProduct key={index} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Notification