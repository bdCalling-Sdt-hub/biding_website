import { Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import Button from './Button'
import { useGetMyAddressQuery, useUpdateAddressMutation } from '../../redux/api/addressApis'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const EditAddAddress = () => {
    const { data } = useGetMyAddressQuery()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [addressId, setAddressId] = useState(null)
    const [update] = useUpdateAddressMutation()
    const onFinish = (values) => {
        update({ id: addressId, data: values }).unwrap()
            .then((res) => {
                navigate(-1)
            })
            .catch(error => {
                //toast.error(error?.data?.message)
            })

    }
    useEffect(() => {
        if (data?.data?.length >= 1) {
            setAddressId(data?.data[0]?._id)
            form.setFieldsValue({ ...data?.data[0] })
        }
    }, [data?.data])
    return (
        <div>
            <h1 className='text-yellow font-medium'>Edit Address</h1>
            <Form
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <div className=' gap-5 mt-5'>
                    <div >
                        <Form.Item
                            name="user_name"
                            rules={[
                                {
                                    message: 'user name is required',
                                    required: true
                                }
                            ]}
                            label={<p className="text-[16px]  font-normal">Full
                                Name</p>}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: 40,
                                    border: "",
                                    borderRadius: "5px",
                                    color: "#919191",
                                    outline: "none"
                                }}
                                className='text-[16px] leading-5 '
                                placeholder="Robert Smith"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    message: 'email is required',
                                    required: true
                                }
                            ]}
                            label={<p className="text-[16px]  font-normal">email</p>}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: 40,
                                    border: "",
                                    borderRadius: "5px",
                                    color: "#919191",
                                    outline: "none"
                                }}
                                className='text-[16px] leading-5 '
                                placeholder="Robert Smith"
                            />
                        </Form.Item>
                        <Form.Item
                            name="streetAddress"
                            rules={[
                                {
                                    message: 'street address is required',
                                    required: true
                                }
                            ]}
                            label={<p className=" text-[16px] font-normal">Street Address</p>}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: 40,
                                    borderRadius: "5px",
                                    color: "#919191",
                                    outline: "none"
                                }}
                                className='text-[16px] leading-5'
                                placeholder={`xyz@gmail.com`}
                            />
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Form.Item
                            name="city"
                            rules={[
                                {
                                    message: 'city is required',
                                    required: true
                                }
                            ]}
                            label={<p className="text-[#919191] text-[16px] leading-5 font-normal">City</p>}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: 40,
                                    borderRadius: "5px",
                                    color: "#919191",
                                    outline: "none"
                                }}
                                className='text-[16px] leading-5'
                                placeholder="San Jose"
                            />
                        </Form.Item>
                        <Form.Item
                            name="state"
                            rules={[
                                {
                                    message: 'state is required',
                                    required: true
                                }
                            ]}
                            label={<p className="text-[#919191] text-[16px] leading-5 font-normal">State</p>}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: 40,
                                    borderRadius: "5px",
                                    color: "#919191",
                                    outline: "none"
                                }}
                                className='text-[16px] leading-5'
                                placeholder="South Dhaka"
                            />
                        </Form.Item>
                        <Form.Item
                            name="zipCode"
                            rules={[
                                {
                                    message: 'zipCode is required',
                                    required: true
                                }
                            ]}
                            label={<p className="text-[#919191] text-[16px] leading-5 font-normal">Zip Code</p>}
                        >
                            <Input
                                type='number'
                                style={{
                                    width: "100%",
                                    height: 40,
                                    borderRadius: "5px",
                                    color: "#919191",
                                    outline: "none"
                                }}
                                className='text-[16px] leading-5'
                                placeholder="6295"
                            />
                        </Form.Item>
                        <Form.Item
                            name="phone_number"
                            rules={[
                                {
                                    message: 'phone number is required',
                                    required: true
                                }
                            ]}
                            label={<p className="text-[#919191] text-[16px] leading-5 font-normal">Phone Number</p>}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: 40,
                                    borderRadius: "5px",
                                    color: "#919191",
                                    outline: "none"
                                }}
                                className='text-[16px] leading-5'
                                placeholder="+9900700007"
                            />
                        </Form.Item>

                    </div>
                </div>

                <Form.Item
                    style={{
                        marginBottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"

                        className='px-5 '
                    >
                        Save  Changes
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditAddAddress