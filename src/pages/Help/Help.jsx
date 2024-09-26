import React from 'react'
import BackButton from '../../components/ui/BackButton'
import { useGetHelpQuery } from '../../redux/api/manageApis'

const Help = () => {
    const { data } = useGetHelpQuery()
    return (
        <div className='mb-10 px-5 md:px-0'>
            <BackButton pageName={'Help'} />
            <div dangerouslySetInnerHTML={{ __html: data?.data?.description }} >

            </div>

        </div>
    )
}

export default Help