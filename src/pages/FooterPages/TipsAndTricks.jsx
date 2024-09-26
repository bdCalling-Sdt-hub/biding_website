import React from 'react'
import BackButton from '../../components/ui/BackButton'
import { useGetTipsQuery } from '../../redux/api/manageApis'

const TipsAndTricks = () => {
    const { data } = useGetTipsQuery()
    return (
        <div className='pb-10 px-5 md:px-0'>
            <BackButton pageName={'Tips & Tricks'} />
            <h1 className='py-4 font-semibold'>Tips & tricks: </h1>

            {/* master art section */}
            <div dangerouslySetInnerHTML={{ __html: data?.data?.description }}>

            </div>
        </div>
    )
}

export default TipsAndTricks