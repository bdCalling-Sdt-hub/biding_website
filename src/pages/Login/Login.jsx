import React from 'react'
import img from '../../assets/login.png'
import { Button, Checkbox, Form, Input } from 'antd'
import { AiFillGoogleCircle } from 'react-icons/ai';
const Login = () => {

    // login form value handle function
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    return (
        <div className='grid grid-cols-2 items-center'>
            <div className='h-screen'>
                <img src={img} className='h-screen w-[100%]' alt="" />
            </div>
            <div>
                <h1 className='text-[40px] font-semibold mb-2'>Welcome back!</h1>
                <p className='mb-5'>Please log in to continue access</p>
                <div className='max-w-[45%]'>
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
                            <Checkbox checked >Remember me</Checkbox>
                            <p className='text-[#F3A211] font-medium'>Forget Password?</p>
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
                        <p>Don’t have a account? <span className='text-yellow'>Sign Up</span></p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Login