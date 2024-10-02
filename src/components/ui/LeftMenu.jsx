import React from "react";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../../redux/api/authApis";


const LeftMenu = ({ mode }) => {
  const navigate = useNavigate()
  const { data } = useGetProfileQuery()
  return (
    <Menu mode={mode}>
      <Menu.Item key="myaccount" ><Link to='/my-profile'>My account</Link></Menu.Item>
      <Menu.Item key="notificatio"><Link to='/notification'>Notification</Link></Menu.Item>
      <Menu.Item key="winner"><Link to='/winner'>Winner</Link></Menu.Item>
      <Menu.Item key="help"><Link to='/help'>Help</Link></Menu.Item>
      <Menu.Item key="contact"><Link to='/contact'>Contact</Link></Menu.Item>
      <Menu.Item key="auth" className="py-6"> {
        data?.data?.email ? <button onClick={() => {
          localStorage.removeItem('token')
          navigate('/')
          window.location.reload()
        }} >Log Out</button> : <div className='flex justify-center items-center gap-5'>
          <Link style={{
            padding:'0px 20px'
          }} to={`/register`} className='border-yellow border text-yellow px-4  rounded-md'>
            Get Started
          </Link>
          <Link style={{
            padding:'0px 20px'
          }} to={`/login`} className='bg-yellow border-yellow border text-white px-4  rounded-md'>
            Sign in
          </Link>
        </div>
      }</Menu.Item>
    </Menu>
  )
}

export default LeftMenu