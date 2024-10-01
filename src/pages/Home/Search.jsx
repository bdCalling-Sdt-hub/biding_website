import React, { useState } from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useGetProfileQuery } from '../../redux/api/authApis';
import { Link } from 'react-router-dom';
const Search = () => {
    const [searchText, setSearchText] = useState('');
    const { data } = useGetProfileQuery()
    const handleSearch = (e) => {
        setSearchText(e.target.value);
        ('Search text:', e.target.value);
    }
    return (
        <div className='md:flex gap-2  items-center justify-between my-4'>
            <div className=' hidden  md:flex items-center gap-2 text-white'>
                <div className='text-[#338BFF] bg-white p-2 rounded-md'>{data?.data?.availableBid} Bids</div>
                <Link to={`/buy-bids`} className='bg-yellow p-2 rounded-md'>Buy Credits</Link>
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