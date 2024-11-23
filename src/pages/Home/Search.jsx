import React, { useState } from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useGetProfileQuery } from '../../redux/api/authApis';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Search = () => {
    const [searchText, setSearchText] = useState('');
    const { data } = useGetProfileQuery()
    const navigate = useNavigate()
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }
    const location = useLocation()
    return (
        <div className='md:flex gap-2  items-center justify-center  my-4'>
            <div></div>
            <div className={`px-2 md:px-0 items-center justify-center ${location?.pathname == '/' ? 'flex' : 'hidden'}`}>
                <Input
                    className=''
                    placeholder="What are you looking for?"
                    value={searchText}
                    onChange={handleSearch}
                    suffix={<SearchOutlined onClick={() => navigate(`/auctions?searchTerm=${searchText}`)} className='cursor-pointer hover:scale-110 active:scale-95 text-yellow' />}
                    style={{ width: 400 }}
                />
            </div>
       
        </div>
    )
}

export default Search