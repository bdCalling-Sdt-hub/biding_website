import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import logo from '../../assets/logo.png'
import { BsYoutube } from 'react-icons/bs'
import { AiFillInstagram, AiOutlineMail } from 'react-icons/ai'
import { FiPhone } from 'react-icons/fi'
import { HiOutlineLocationMarker } from 'react-icons/hi'
const Footer = () => {
  return (
    <div className='max-w-screen-2xl mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 justify-between mx-10 md:mx-0 lg:grid-cols-4 gap-5   '>

        <div className='flex items-center justify-center '>
          <div>
            <div className='flex items-center gap-2 mb-[18px]'>
              <img src={logo} className='h-[35px] w-[35px]' alt="" />
              <h1 className='text-[#2E2E2E] text-[28px] font-bold'>Biding Website</h1>
            </div>
            <p className='leading-7 w-[100%] md:w-[70%] text-[18px] font-normal text-[#585858]'>Your Ultimate Destination for Online Auctions – Engage in the Art of Bidding, and Secure Unmatched Deals with Every Win.</p>
            <div className='mt-5 flex items-center gap-5 text-yellow'>
              <FaFacebookF className='text-yellow' />
              <FaTwitter />
              <AiFillInstagram />
              <FaLinkedinIn />
              <BsYoutube />
            </div>
          </div>
        </div>


        <div className=''>
          <p className='text-[20px] font-semibold  mb-[24px]'>Company</p>
          <p className='mb-2 text-[#585858]'>About</p>
          <p className=' mb-2 text-[#585858]'>Terms and Constitions</p>
          <p className=' mb-2 text-[#585858]'>Privacy Policy</p>
        </div>
        <div className=''>
          <p className='text-[20px] font-semibold  mb-[24px]'>Support</p>
          <p className=' mb-2 text-[#585858]'>FAQ</p>
          <p className=' mb-2 text-[#585858]'>Tips & tricks</p>
          <p className=' mb-2 text-[#585858]'>Accessibility</p>
        </div>
        <div className='yellow'>
          <p className='text-[20px] font-semibold  mb-[24px]'>Contact Us</p>
          <div className='flex items-center gap-2 mb-2'>
            <AiOutlineMail className='text-yellow' />
            <p className=' text-[#585858]'>contact@company.com</p>
          </div>
          <div className='flex items-center gap-2 mb-2'>
            <FiPhone className='text-yellow' />
            <p className=' text-[#585858]'>414 687 - 5892</p>
          </div>
          <div className='flex items-center gap-2 mb-2'>
            <HiOutlineLocationMarker className='text-yellow' />
            <p className=' text-[#585858] '> 794 Mcallister St
              San Francisco, 94102</p>
          </div>
        </div>
      </div>
      <div className=' mt-10 '>
        <div className='border-b-[1px] max-w-[90%] mx-auto border-[#DCDCDC] mb-2'></div>
        <p className='text-center text-[#585858] p-2 md:p-0'>All Rights Reserved. Copyright © 2024 Biding website</p>
      </div>
    </div>
  )
}

export default Footer