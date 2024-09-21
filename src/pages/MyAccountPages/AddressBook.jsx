import React from 'react'
import { CiEdit } from 'react-icons/ci'

const AddressBook = () => {
  return (
    <div>
      <h1 className='text-yellow font-medium'>Address Book</h1>
      <div className='flex justify-between items-center mt-5'>
        <p className='font-medium'>Shipping Address</p>
        <CiEdit className='text-yellow cursor-pointer' size={25} />
      </div>
      <div className='space-y-2 mt-5'>
        <p>Full Name: <span className='font-medium'>Robert Smith</span></p>
        <p>Street Address: <span className='font-medium'> 1901 Thornridge Cir. Shiloh, Hawaii 81063</span></p>
        <p>City: <span className='font-medium'> San Jose</span></p>
        <p>State: <span className='font-medium'> South Dakota</span></p>
        <p>Zip Code: <span className='font-medium'> 62957</span></p>
        <p>Phone Number: <span className='font-medium'>(406) 555-0120</span></p>
      </div>
    </div>
  )
}

export default AddressBook 