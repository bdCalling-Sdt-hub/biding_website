import React from 'react'
import img from '../../assets/user.png'
import Button from '../../components/ui/Button'
import { Link } from 'react-router-dom'
const MyProfile = () => {
  return (
    <div>
      <h1 className='text-yellow font-medium '>My Profile</h1>
      <div className='flex flex-col justify-center items-center py-10'>
        <img src={img} alt="" />
        <div className='text-center'>
          <p className='text-[20px] font-medium'>Robert Smith</p>
          <p>robertsmithctg23@gmail.com</p>
        </div>
      </div>
      <div className='px-0 md:px-24 space-y-4'>
        <div className='flex justify-between items-center'>
          <p>Phone Number:</p>
          <p>+3489 9999 9778</p>
        </div>
        <div className='flex justify-between items-center'>
          <p>Date of Birth:</p>
          <p>12/04/2002</p>
        </div>
        <div className='flex items-center justify-center pt-10'>
          <Link to='/my-profile/edit-profile' className='max-w-[200px] bg-yellow text-white rounded-md px-12 py-1'>Update </Link>
        </div>
      </div>

    </div>
  )
}

export default MyProfile