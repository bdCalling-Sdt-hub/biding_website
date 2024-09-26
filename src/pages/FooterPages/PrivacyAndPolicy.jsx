import React from 'react'
import BackButton from '../../components/ui/BackButton'
import { useGetPrivacyPolicyQuery } from '../../redux/api/manageApis'

const PrivacyAndPolicy = () => {
    const { data } = useGetPrivacyPolicyQuery()
    return (
        <div className='py-2 pb-10 px-5 md:px-0'>
            <BackButton pageName={'Privacy Policy'} />
            {/* terms and condtions */}
            <div dangerouslySetInnerHTML={{ __html: data?.data?.description }}>

            </div>
        </div>
    )
}

export default PrivacyAndPolicy 