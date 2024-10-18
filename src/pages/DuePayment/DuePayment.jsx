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
import { useConfirmPaymentMutation, useGetSingleOrderQuery, usePaypalCreatePaymentMutation } from '../../redux/api/paymentApis'
import { useNavigate } from 'react-router-dom'
const DuePayment = () => {
    const [id, setId] = useState(new URLSearchParams(window.location.search).get('id') || null)
    const [form] = Form.useForm()
    const [update] = useUpdateAddressMutation()
    const [modalOpen, setModalOpen] = useState(false);
    const { data: singleAuctions } = useGetSingleOrderQuery(id)
    console.log(singleAuctions)
    const { data: addressDetails } = useGetMyAddressQuery()
    const [address, setAddress] = useState({})
    const [payWithFinance, setPayWithFinance] = useState(true)
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
            navigate('/my-profile/financial-payment')
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
            setAddress(addressDetails?.data?.[0])
            form.setFieldsValue({ ...addressDetails?.data?.[0] })
        }
    }, [addressDetails?.data])
    useEffect(() => {
        setData({
            "orderId": id,
            "item": singleAuctions?.data?.item?.name,
            "itemType": 'PRODUCT',
            "product": singleAuctions?.data?.item?._id,
            "winingBid": singleAuctions?.data?.item?.currentPrice,
            "totalAmount": singleAuctions?.data?.monthlyAmount,
            "orderType": payWithFinance ? "FINANCE" : "NORMAL",
            "paymentType": payWithFinance ? "INSTALLMENT" : "FULL_PAYMENT"
        })
    }, [address, singleAuctions?.data, payWithFinance])

    return (
        <div className='px-5 lg:px-0'>
            <BackButton pageName={'Payment'} />
            <div className='grid grid-cols-1 md:grid-cols-2  gap-5'>
                <div className='bg-white p-8 rounded-md my-5'>
                    <p className='font-medium text-[24px]'>Winning Product</p>
                    <p className='font-medium text-[20px] mt-2'>{singleAuctions?.data?.name}</p>
                    <img src={singleAuctions?.data?.item?.images?.[0]} className='w-full py-5' alt="" />
                    <div>
                        <div className='flex justify-between items-center pb-3'>
                            <p>Total Amount</p>
                            <p className='font-semibold'>${singleAuctions?.data?.item?.currentPrice}</p>
                        </div>
                        <div className='flex justify-between items-center pb-3'>
                            <p>Shipping Fee:</p>
                            <p className='font-semibold'>Free</p>
                        </div>
                        {
                            singleAuctions?.data?.item?.financeAvailable && <div className=' mb-4'>
                                {/* <div className='flex justify-between items-center'>
                                    <p>Monthly Financing</p>
                                    <Switch defaultChecked={false} onChange={(value) => setPayWithFinance(value)} />
                                </div> */}
                                {
                                    payWithFinance && <div className='w-full my-2'>
                                        <div className='flex justify-between items-center pb-3'>
                                            <p>Total Month</p>
                                            <p className='font-semibold'>{singleAuctions?.data?.item?.totalMonthForFinance}</p>
                                        </div>
                                        <div className='flex justify-between items-center pb-3'>
                                            <p>Due Amount</p>
                                            <p className='font-semibold'>${singleAuctions?.data?.dueAmount}</p>
                                        </div>
                                        <div className='flex justify-between items-center pb-3'>
                                            <p>Per Month</p>
                                            <p className='font-semibold'>${singleAuctions?.data?.monthlyAmount}</p>
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
                        {/* <div className='pt-5'>
                            <button onClick={() => setModalOpen(true)} className='text-yellow border  rounded-lg w-[70%] py-1'>Change Shipping Address</button>
                        </div> */}
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

export default DuePayment
