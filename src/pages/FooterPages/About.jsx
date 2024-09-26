import React from 'react'
import BackButton from '../../components/ui/BackButton'
import { useGetAboutUsQuery } from '../../redux/api/manageApis'

const About = () => {
    const { data, isLoading, isError } = useGetAboutUsQuery()
    return (
        <div className='pb-5 px-5 md:px-0'>
            <BackButton pageName={'About'} />
            {/* About us section */}
            <div dangerouslySetInnerHTML={{ __html: data?.data?.description }}></div>
        </div>
    )
}

export default About