import React, { useState } from 'react'
import ProductCard from '../../components/ui/ProductCard'
import {  useGetBookmarkQuery } from '../../redux/api/bookmarkApis'
import UpcommingProduct from '../../components/ui/UpcommingProduct'

const Bookmarks = () => {
  const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1)
  const { data } = useGetBookmarkQuery({ page })
  return (
    <div>
      <h1 className='text-yellow font-medium'>Bookmarks</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {
          data?.data?.map((prod, index) => <UpcommingProduct key={index} product={prod?.auction} BookmarkId={prod?._id} type='bookmark' />)
        }
      </div>
    </div>
  )
}

export default Bookmarks