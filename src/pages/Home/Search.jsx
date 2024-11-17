import React, { useState } from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useGetProfileQuery } from '../../redux/api/authApis';
import { Link, useNavigate } from 'react-router-dom';
const Search = () => {
    const [searchText, setSearchText] = useState('');
    const { data } = useGetProfileQuery()
    const navigate = useNavigate()
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }
    return (
        <div className='md:flex gap-2  items-center justify-between  my-4'>
            <div></div>
            <div className=' px-2 md:px-0 flex items-center justify-center '>
                <Input
                    className=''
                    placeholder="What are you looking for?"
                    value={searchText}
                    onChange={handleSearch}
                    suffix={<SearchOutlined onClick={() => navigate(`/auctions?searchTerm=${searchText}`)} className='cursor-pointer hover:scale-110 active:scale-95 text-yellow' />}
                    style={{ width: 400 }}
                />
            </div>
            <div className=' hidden  md:flex  items-center gap-2 text-white border border-[#A1CAFF] p-[2px] rounded-md'>
                <div className='text-[#338BFF] bg-white p-2 rounded-md'>{Number(data?.data?.availableBid || 0).toFixed()} Bids</div>
                <Link to={`/buy-bids`} className='bg-yellow p-2 rounded-md'>Buy Credits</Link>
            </div>


        </div>
    )
}

export default Search