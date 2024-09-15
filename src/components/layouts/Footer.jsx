import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import logo from '../../assets/logo.png'
import { BsYoutube } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'
const Footer = () => {
  return (
    <div className='max-w-screen-2xl mx-auto  '>
      <div className='grid lg:grid-cols-4 gap-5'>

        <div >
          <div className='flex items-center gap-2 mb-[18px]'>
            <img src={logo} className='h-[35px] w-[35px]' alt="" />
            <h1 className='text-[#2E2E2E] text-[28px] font-bold'>Biding Website</h1>
          </div>
          <p className='leading-7 w-[70%] text-[18px] font-normal text-[#585858]'>Your Ultimate Destination for Online Auctions – Engage in the Art of Bidding, and Secure Unmatched Deals with Every Win.</p>
          <div className='mt-5 flex items-center gap-5 text-yellow'>
            <FaFacebookF className='text-yellow' />
            <FaTwitter />
            <AiFillInstagram />
            <FaLinkedinIn />
            <BsYoutube />
          </div>
        </div>


        <div>
          <p className='text-[20px] font-semibold  mb-[24px]'>Company</p>
          <p className='text-[20px] mb-2 text-[#585858]'>About</p>
          <p className='text-[20px] mb-2 text-[#585858]'>Terms and Constitions</p>
          <p className='text-[20px] mb-2 text-[#585858]'>Privacy Policy</p>
        </div>
        <div>
          <p>Support</p>
        </div>
        <div>
          <p>Contact Us</p>
        </div>
      </div>
    </div>
  )
}

export default Footer