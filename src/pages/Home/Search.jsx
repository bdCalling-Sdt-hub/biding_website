import React, { useState } from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const Search = () => {
    const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    console.log('Search text:', e.target.value);
  }
    return (
        <div className='md:flex gap-2  items-center justify-between my-4'>
            <div className=' hidden  md:flex items-center gap-2 text-white'>
                <div className='text-[#338BFF] bg-white p-2 rounded-md'>225 Bids</div>
                <div className='bg-yellow p-2 rounded-md'>Buy Credits</div>
            </div>
            <div className='flex items-center justify-center '>
                <Input
                    className=''
                    placeholder="What are you looking for?"
                    value={searchText}
                    onChange={handleSearch}
                    suffix={<SearchOutlined />}
                    style={{ width: 300 }}
                />
            </div>

        </div>
    )
}

export default Search