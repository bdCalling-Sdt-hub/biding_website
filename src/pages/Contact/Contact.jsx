import React from 'react'
import BackButton from '../../components/ui/BackButton'
import { useGetContactQuery } from '../../redux/api/manageApis'

const Contact = () => {
    const { data } = useGetContactQuery()
    return (
        <div className='mb-10 px-5 md:px-0'>
            <BackButton pageName={'Contact'} />
            <div dangerouslySetInnerHTML={{ __html: data?.data?.description }}>

            </div>
        </div>
    )
}

export default Contact