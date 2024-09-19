import React, { useState } from 'react'
import BackButton from '../../components/ui/BackButton'
import img from '../../assets/phone1.png'
import { Form, Input, Modal, Tabs } from 'antd'
import PaymentStripe from '../../components/ui/PaymentStripe'
import PaymentPayPal from '../../components/ui/PaymentPayPal'
import Button from '../../components/ui/Button'
const Payment = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const items = [
        {
            key: '1',
            label: 'Credit Card',
            children: <PaymentStripe />,
        },
        {
            key: '2',
            label: 'PayPal',
            children: <PaymentPayPal />,
        },
        ,
    ];


    /**Handle change location  */
    const onFinish = (values) => {
        console.log(values);
    }

    return (
        <div className='px-5 lg:px-0'>
            <BackButton pageName={'Payment'} />
            <div className='grid grid-cols-1 md:grid-cols-2  gap-5'>
                <div className='bg-white p-8 rounded-md my-5'>
                    <p className='font-medium text-[24px]'>Winning Product</p>
                    <p className='font-medium text-[20px] mt-2'>Apple iPhone 14 Pro Max</p>
                    <img src={img} className='w-full py-5' alt="" />
                    <div>
                        <div className='flex justify-between items-center pb-3'>
                            <p>Winning Price</p>
                            <p className='font-semibold'>$548.00</p>
                        </div>
                        <div className='flex justify-between items-center pb-3'>
                            <p>Shipping Fee:</p>
                            <p className='font-semibold'>Free</p>
                        </div>
                        <div className='flex justify-between items-center '>
                            <p>Total Fee</p>
                            <p className='font-semibold'>$560.00</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='bg-white p-8 rounded-md my-5 space-y-3'>
                        <h1 className='text-[24px] font-medium'>Shipping Address</h1>
                        <p>Full Name: <span className='font-medium'>Robert Smith</span></p>
                        <p>Street Address:<span className='font-medium'> 1901 Thornridge Cir. Shiloh, Hawaii 81063</span></p>
                        <p>City:<span className='font-medium'> San Jose</span></p>
                        <p>State: <span className='font-medium'> South Dakota</span></p>
                        <p>Zip Code:<span className='font-medium'> 62957</span></p>
                        <p>Phone Number: <span className='font-medium'> (406) 555-0120</span></p>
                        <div className='pt-5'>
                            <button onClick={() => setModalOpen(true)} className='text-yellow border  rounded-lg w-[70%] py-1'>Change Shipping Address</button>
                        </div>
                    </div>
                    <div className='bg-white p-8 rounded-md'>
                        <Tabs defaultActiveKey="1" items={items} />
                    </div>
                </div>
            </div>
            <Modal
                title="Change Shipping Address"
                centered
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={false}
            >
                <Form
                    onFinish={onFinish}
                    layout="vertical"

                >
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                message: 'Please enter your name!',
                            },
                        ]}
                    >
                        <Input placeholder="Enter your full name" />
                    </Form.Item>
                    <Form.Item
                        label="Street Address"
                        name="address"
                        rules={[
                            {
                                message: 'Please enter street address',
                            },
                        ]}
                    >
                        <Input placeholder="Enter your street address" />
                    </Form.Item>
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[
                            {
                                message: 'Please enter city',
                            },
                        ]}
                    >
                        <Input placeholder="Enter City" />
                    </Form.Item>
                    <Form.Item
                        label="State"
                        name="state"
                        rules={[
                            {
                                message: 'Please enter state',
                            },
                        ]}
                    >
                        <Input placeholder="Enter state" />
                    </Form.Item>
                    <Form.Item
                        label="Zip Code"
                        name="zip"
                        rules={[
                            {
                                message: 'Please enter Zip code',
                            },
                        ]}
                    >
                        <Input placeholder="Enter Zip code" />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                            {
                                message: 'Please enter phone number',
                            },
                        ]} 
                    >
                        <Input placeholder="Enter Phone Number" />
                    </Form.Item>
                    <div className='flex  items-center justify-center w-full gap-5 '>
                        <Form.Item>

                            <button onClick={()=> setModalOpen(false)} className='border border-yellow rounded-md px-10 py-1 text-yellow'>cancel</button>
                        </Form.Item>
                        <Form.Item>
                            <Button className='w-full px-10' >Submit</Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default Payment