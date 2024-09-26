import React from 'react'
import BackButton from '../../components/ui/BackButton'
import { useGetAccessibilityQuery } from '../../redux/api/manageApis'

const Accessibility = () => {
    const { data } = useGetAccessibilityQuery()
    return (
        <div className='pb-10 px-5 md:px-0'>
            <BackButton pageName={'Accessibility'} />
            {/* accessibility section */}
            <div dangerouslySetInnerHTML={{ __html: data?.data?.description }}>
            </div>
        </div>
    )
}

export default Accessibility