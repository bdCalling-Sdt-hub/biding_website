import { Button, Checkbox, Form, Input } from 'antd'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import img from '../../assets/login.png'


const Register = () => {


    // Register form value handle function
    const onFinish = (values) => {
        console.log('Success:', values);
    };
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 justify-center  items-center'>
            <div className='h-screen hidden md:block'>
                <img src={img} className='h-screen w-[100%]' alt="" />
            </div>
            <div className='mx-auto md:mx-0'>
                <h1 className='text-[40px] font-semibold mb-2'>Sign Up</h1>
                <p className='mb-5'>Just a few quick things to get started</p>
                <div className='md:max-w-[45%] mx-auto md:mx-0 max-w-[100%] '>
                    <Form
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Full Name"
                            name="fullName"

                        >
                            <Input placeholder='Enter your email here' />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"

                        >
                            <Input placeholder='Enter your email here' />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                            name="phone"

                        >
                            <Input placeholder='Enter your phone number' />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name='password'
                        >
                            <Input.Password placeholder='**********' />
                        </Form.Item>
                        <Form.Item
                            label="Confirm Password"
                            name='confirmPassword'
                        >
                            <Input.Password placeholder='**********' />
                        </Form.Item>
                        <div className='flex justify-between items-center'>
                            <Checkbox checked >I agre with the temrms and condition</Checkbox>
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
                        <AiFillGoogleCircle size={25} className='text-yellow ' />
                        <p>Already have and account? <Link to='/login' className='text-yellow'>Sign In</Link></p>
                    </div>
                </div>
            </div>


        </div>
  )
}

export default Register