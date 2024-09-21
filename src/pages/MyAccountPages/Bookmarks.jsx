import React from 'react'
import ProductCard from '../../components/ui/ProductCard'

const Bookmarks = () => {
  return (
    <div>
      <h1 className='text-yellow font-medium'>Bookmarks</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {
          [...Array(9)]?.map(prod => <ProductCard />)
        }
      </div>
    </div>
  )
}

export default Bookmarks