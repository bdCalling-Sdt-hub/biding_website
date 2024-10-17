import React from 'react';

const HomeContentHeading = ({title}) => {
    return (
        <div className='flex  my-auto items-center'>
            <div className='border-2  h-[28px] mr-2 border-yellow'></div>
            <h1 className='text-[32px] font-semibold text-[#2E2E2E] '>{title}</h1>
        </div>
    );
}

export default HomeContentHeading;
