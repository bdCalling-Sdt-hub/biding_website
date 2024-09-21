import { Button, Checkbox, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';

const AdminLogin = () => {
    const onFinish = (values) => {
        console.log(values);
    }
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-[#fbe2b5] '>
            <div className='bg-white rounded-md p-10   min-w-[500px]'>
                <h1 className='text-[24px] font-medium text-center'>Login to Account</h1>
                <p className='text-[14px] text-center mb-5'>Please enter your email and password to continue</p>
                <Form
                    layout='vertical'
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='email'
                        label="Email"
                    >
                        <Input placeholder='esteban_schiller@gmail.com' />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label="Password"
                    >
                        <Input.Password placeholder='**********' />
                    </Form.Item>
                    <div className='flex justify-between items-center'>
                        <Checkbox checked >Remember me</Checkbox>
                        <Link to='/admin-forget-password' className='text-[#F3A211] hover:text-[#F3A211] font-medium'>Forget Password?</Link>
                    </div>
                    <Form.Item

                    >
                        <Button type="primary" className='w-[100%] mt-4 bg-yellow  custom-button' htmlType="submit">
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default AdminLogin