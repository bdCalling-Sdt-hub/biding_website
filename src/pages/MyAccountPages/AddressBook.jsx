import React, { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { useGetMyAddressQuery } from '../../redux/api/addressApis'
const AddressBook = () => {
  const { data } = useGetMyAddressQuery()
  const [address, setAddress] = useState({})
  useEffect(() => {
    if (data?.data?.length >= 1) {
      setAddress(data?.data[0])
    }
  }, [data?.data])
  return (
    <div>
      <h1 className='text-yellow font-medium'>Address Book</h1>
      <div className='flex justify-between items-center mt-5'>
        <p className='font-medium'>Shipping Address</p>
        <Link to='/my-profile/edit-address'> <CiEdit className='text-yellow cursor-pointer' size={25} /></Link>
      </div>
      <div className='space-y-2 mt-5'>
        <p>Full Name: <span className='font-medium'>{address?.user_name}</span></p>
        <p>Street Address: <span className='font-medium'> {address?.streetAddress}</span></p>
        <p>City: <span className='font-medium'> {address?.city}</span></p>
        <p>State: <span className='font-medium'>{address?.state}</span></p>
        <p>Zip Code: <span className='font-medium'> {address?.zipCode}</span></p>
        <p>Phone Number: <span className='font-medium'>{address?.phone_number}</span></p>
      </div>
    </div>
  )
}

export default AddressBook  