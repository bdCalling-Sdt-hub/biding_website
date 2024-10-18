import React, { useEffect, useState } from 'react'
import BackButton from '../../components/ui/BackButton'
import { Form, Input, Modal, Switch, Tabs } from 'antd'
import PaymentPayPal from '../../components/ui/PaymentPayPal'
import Button from '../../components/ui/Button'
import PaymentComponent from '../../components/Stripe/PaymentComponent'
import { useGetSingleAuctionQuery } from '../../redux/api/auctionsApis'
import { useGetMyAddressQuery, useUpdateAddressMutation } from '../../redux/api/addressApis'
// import { useConfirmPaymentMutation } from '../../redux/api/paymentApis'
import { toast } from 'sonner'
import { useConfirmPaymentMutation, useFinancePaymentMutation, usePaypalCreatePaymentMutation } from '../../redux/api/paymentApis'
import { Navigate, useNavigate } from 'react-router-dom'
import { useGetProfileQuery } from '../../redux/api/authApis'
const Payment = () => {
    const [id, setId] = useState(new URLSearchParams(window.location.search).get('id') || null)
    const [form] = Form.useForm()
    const [update] = useUpdateAddressMutation()
    const [financePayment, { isLoading }] = useFinancePaymentMutation()
    const [modalOpen, setModalOpen] = useState(false);
    const { data: singleAuctions } = useGetSingleAuctionQuery(id)
    const { data: addressDetails } = useGetMyAddressQuery()
    const [address, setAddress] = useState({})
    const [payWithFinance, setPayWithFinance] = useState(false)
    const [data, setData] = useState({
        "shippingAddress": null,
        "item": null,
        "itemType": 'PRODUCT',
        "product": null,
        "winingBid": 0,
        "totalAmount": 0
    })
    const navigate = useNavigate()
    const [confirmPayment] = useConfirmPaymentMutation()
    //  payment success handler
    const onPaymentSuccess = (data) => {
        const formateData = {
            paymentId: data?.paymentIntent?.id
        }
        confirmPayment(formateData).unwrap().then((res) => {
            //toast.success(res.data?.message || 'order Confirmed')
            navigate(`/my-profile/${payWithFinance ? 'financial-payment' : 'my-order'}`)//
        }).catch((err) => {
            //toast.error(err?.message || 'something went wrong')
        })
    }
    const items = [
        {
            key: '1',
            label: 'Credit Card',
            children: <PaymentComponent data={data} onPaymentSuccess={onPaymentSuccess} />,
        },
        {
            key: '2',
            label: 'PayPal',
            children: <PaymentPayPal data={data} />,
        },
        ,
    ];
    /**Handle change location  */
    const onFinish = (values) => {
        update({ id: address?._id, data: values }).unwrap().then((res) => {
            setModalOpen(false)
        })
    }

    useEffect(() => {
        if (addressDetails?.data?.length >= 1) {
            setAddress(addressDetails?.data[0])
            form.setFieldsValue({ ...addressDetails?.data[0] })
        }
    }, [addressDetails?.data])
    useEffect(() => {
        setData({
            "shippingAddress": address?._id,
            "item": singleAuctions?.data?.name,
            "itemType": 'PRODUCT',
            "product": singleAuctions?.data?._id,
            "winingBid": singleAuctions?.data?.currentPrice,
            "totalAmount": payWithFinance ? Number(singleAuctions?.data?.currentPrice / singleAuctions?.data?.totalMonthForFinance).toFixed(2) : singleAuctions?.data?.currentPrice,
            "orderType": payWithFinance ? "FINANCE" : "NORMAL",
            "paymentType": payWithFinance ? "INSTALLMENT" : "FULL_PAYMENT"
        })
    }, [address, singleAuctions?.data, payWithFinance])
    const onFiancePayment = (value) => {
        value.shippingAddress = address?._id
        value.product = singleAuctions?.data?._id
        value.item = singleAuctions?.data?.name
        financePayment(value).unwrap().then(res => {
            navigate(`/my-profile/financial-payment`)
            //toast.success(res?.message)
        }).catch(err => {
            console.log(err)
            //toast.error(err?.data?.message)
        })

    }
    return (
        <div className='px-5 lg:px-0'>
            <BackButton pageName={'Payment'} />
            <div className='grid grid-cols-1 md:grid-cols-2  gap-5'>
                <div className='bg-white p-8 rounded-md my-5'>
                    <p className='font-medium text-[24px]'>Winning Product</p>
                    <p className='font-medium text-[20px] mt-2'>{singleAuctions?.data?.name}</p>
                    <img src={singleAuctions?.data?.images[0]} className='w-full py-5' alt="" />
                    <div>
                        <div className='flex justify-between items-center pb-3'>
                            <p>Winning Price</p>
                            <p className='font-semibold'>${singleAuctions?.data?.currentPrice}</p>
                        </div>
                        <div className='flex justify-between items-center pb-3'>
                            <p>Shipping Fee:</p>
                            <p className='font-semibold'>Free</p>
                        </div>
                        {
                            singleAuctions?.data?.financeAvailable && <div className=' mb-4'>
                                <div className='flex justify-between items-center'>
                                    <p>Monthly Financing</p>
                                    <Switch defaultChecked={false} onChange={(value) => setPayWithFinance(value)} />
                                </div>
                                {
                                    payWithFinance && <div className='w-full my-2'>
                                        <div className='flex justify-between items-center pb-3'>
                                            <p>Total Month</p>
                                            <p className='font-semibold'>{singleAuctions?.data?.totalMonthForFinance}</p>
                                        </div>
                                        <div className='flex justify-between items-center pb-3'>
                                            <p>Per Month</p>
                                            <p className='font-semibold'>${Number(singleAuctions?.data?.currentPrice / singleAuctions?.data?.totalMonthForFinance).toFixed(2)}</p>
                                        </div>
                                    </div>
                                }

                            </div>
                        }

                        <div className='flex justify-between items-center '>
                            <p>Pay</p>
                            <p className='font-semibold'>${data?.totalAmount}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='bg-white p-8 rounded-md my-5 space-y-3'>
                        <div>
                            <h1 className='text-yellow font-medium'>Address Book</h1>
                            <div className='space-y-2 mt-5'>
                                <p>Full Name: <span className='font-medium'>{address?.user_name}</span></p>
                                <p>Street Address: <span className='font-medium'> {address?.streetAddress}</span></p>
                                <p>City: <span className='font-medium'> {address?.city}</span></p>
                                <p>State: <span className='font-medium'>{address?.state}</span></p>
                                <p>Zip Code: <span className='font-medium'> {address?.zipCode}</span></p>
                                <p>Phone Number: <span className='font-medium'>{address?.phone_number}</span></p>
                            </div>
                        </div>
                        <div className='pt-5'>
                            <button onClick={() => setModalOpen(true)} className='text-yellow border  rounded-lg w-[70%] py-1'>Change Shipping Address</button>
                        </div>
                    </div>
                    <div className='bg-white p-8 rounded-md'>
                        {
                            payWithFinance ? <Form className='mx-auto max-w-[500px]'
                                onFinish={onFiancePayment}
                                layout='vertical'
                            >
                                <p className='text-2xl text-center'>Pay with Financing</p>
                                <Form.Item
                                    name={`customerName`}
                                    label='Name'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Name is Required'
                                        }
                                    ]}
                                >
                                    <Input placeholder='name' />
                                </Form.Item>
                                <Form.Item
                                    name={`customerEmail`}
                                    label='Email'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Email is Required'
                                        }
                                    ]}
                                >
                                    <Input type='email' placeholder='email' />
                                </Form.Item>
                                <Form.Item
                                    name={`customerPhoneNum`}
                                    label='Phone Number'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Phone Number is Required'
                                        }
                                    ]}
                                >
                                    <Input placeholder='Phone Number' />
                                </Form.Item>
                                <Form.Item
                                    name={`customerAddress`}
                                    label='Address'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Address is Required'
                                        }
                                    ]}
                                >
                                    <Input placeholder='Address' />
                                </Form.Item>
                                <button className='bg-yellow text-white w-full py-2 rounded-md'>
                                    Apply For Financing
                                </button>
                            </Form> : <Tabs defaultActiveKey="1" items={items} />
                        }

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
            </Modal>
        </div>
    )
}

export default Payment