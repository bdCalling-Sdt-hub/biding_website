import React from 'react'
import BackButton from '../../components/ui/BackButton'
import UpcommingProduct from '../../components/ui/UpcommingProduct'

const UpcomingAuction = () => {
    const product = [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15]
  return (
    <div className='px-5 lg:px-0 pb-10'>
        <BackButton pageName={'Upcoming Auction'} />
        <h1 className='font-semibold'>Upcoming Auction</h1>
        <div >
            <div className='grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 '>
           {
                product?.map(pro=> (
                        <UpcommingProduct/>
                ))
            }
            </div>
            
        </div>
    </div>
  )
}

export default UpcomingAuction