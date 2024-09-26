import React from 'react'
import BackButton from '../../components/ui/BackButton'
import { useGetTermsAndConditionsQuery } from '../../redux/api/manageApis'

const TermsAndCondition = () => {
    const { data } = useGetTermsAndConditionsQuery()
    console.log(data)
    return (
        <div className='py-2 pb-10 px-5 md:px-0'>
            <BackButton pageName={'Terms and Conditions'} />
            {/* terms and condtions */}
            <div dangerouslySetInnerHTML={{ __html: data?.data?.description }}>
            
            </div>
        </div>
    )
}

export default TermsAndCondition