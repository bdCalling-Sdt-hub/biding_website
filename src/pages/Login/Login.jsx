import React from 'react'
import img from '../../assets/login.png'
import { Button, Checkbox, Form, Input, Spin } from 'antd'
import { AiFillGoogleCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/api/authApis';
import { toast } from 'sonner';
import GoogleAuthLogin from '../../components/ui/GoogleAuthLogin';
const Login = () => {
    const navigate = useNavigate()
    const [loginUser, { isLoading }] = useLoginMutation()

    // login form value handle function
    const onFinish = (values) => {
        loginUser(values).unwrap()
            .then((payload) => {
                if (payload?.data?.accessToken) {
                    toast.success(payload?.message)
                    localStorage.setItem('token', JSON.stringify(payload?.data?.accessToken))
                    navigate('/')
                    window.location.reload()
                } else {
                    toast.error(payload?.message || 'something went wrong')
                    localStorage.removeItem('token')
                }
            })
            .catch((error) => {
                toast.error(error?.data?.message || 'something went wrong')
            })
    };
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 justify-center  items-center'>
            {
                isLoading && <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center"> <Spin size="large" /></div>
            }
            <div className='h-screen hidden md:block'>
                <img src={img} className='h-screen w-[100%]' alt="" />
            </div>
            <div className='mx-auto md:mx-0'>
                <h1 className='text-[40px] font-semibold mb-2'>Welcome back!</h1>
                <p className='mb-5'>Please log in to continue access</p>
                <div className='md:max-w-[45%] mx-auto md:mx-0 max-w-[100%] '>
                    <Form
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Email"
                            name="email"

                        >
                            <Input placeholder='Enter your email here' />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name='password'
                        >
                            <Input.Password placeholder='**********' />
                        </Form.Item>
                        <div className='flex justify-between items-center'>
                            <Checkbox >Remember me</Checkbox>
                            <Link to='/forget-password' className='text-[#F3A211] hover:text-[#F3A211] font-medium'>Forget Password?</Link>
                        </div>
                        <Form.Item

                        >
                            <Button type="primary" className='w-[100%] mt-4 bg-yellow  custom-button' htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* Google signin  */}
                    <div className='flex flex-col items-center gap-2'>
                        <p className='text-center text-[14px]'>Or Sign in with</p>
                        <div className='flex justify-center items-center w-full'>
                            <GoogleAuthLogin />
                        </div>
                        <p>Don’t have a account? <Link to='/register' className='text-yellow'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login