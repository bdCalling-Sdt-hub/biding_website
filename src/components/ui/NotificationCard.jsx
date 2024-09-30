import React from 'react'
import { MdAccessTime } from 'react-icons/md'

const NotificationCard = ({ item }) => {
    return (
        <div className='border-b py-3 border-[#DCDCDC]'>
            <div className='flex justify-between items-center'>
                <p className='font-medium text-[16px]'>{item?.title}  </p>
                <div className='flex gap-2 items-center'>
                    <MdAccessTime className='text-yellow' />
                    <p>{convertTimestamp(item?.updatedAt)}</p>
                </div>
            </div>
            <p className='mt-2'>{item?.message}</p>
        </div>
    )
}

export default NotificationCard
function convertTimestamp(isoString) {
    const date = new Date(isoString);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;

    return `${formattedDate} at ${formattedTime}`;
}