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
            <div className='grid grid-cols-12  justify-between gap-5'>
                <div className='col-span-10 bg-white rounded-lg m-1 p-4'>
                    <h1 className='text-[24px] font-medium pb-4'>Notification</h1>
                    {
                        product?.map(product => <NotificationCard />)
                    }
                </div>
                <div className='col-span-2 '>
                    <p className='font-medium text-[18px] pb-5'>Upcoming Auction:</p>
                    {
                        product?.map(product => <UpcommingProduct />)
                    }

                </div>
            </div>
        </div>
    )
}

export default Notification