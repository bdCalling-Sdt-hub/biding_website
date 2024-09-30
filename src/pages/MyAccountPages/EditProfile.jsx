import React, { useEffect, useState } from 'react'
import { IoCameraOutline } from 'react-icons/io5';
import img from '../../assets/user.png'
import { Form, Input, Spin } from 'antd';
import Button from '../../components/ui/Button';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../redux/api/authApis';
import { toast } from 'sonner';
const EditProfile = () => {
    const [image, setImage] = useState();
    const [form] = Form.useForm()
    const { data } = useGetProfileQuery()
    const [updateProfile, { isLoading }] = useUpdateProfileMutation()

    const handleChange = (e) => {
        const file = e.target.files[0];
        setImage(file)

    }

    const onEditProfile = (values) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(values));
        if (image) {
            formData.append("profile_image", image);
        }
        updateProfile(formData).unwrap()
            .then((payload) => {
                (payload)
                toast.success(payload?.message || "Profile updated successfully")
            })
            .catch((error) => {
                (error)
                toast.error(error?.data?.message || "Something went wrong")
            })
    }
    useEffect(() => {
        if (data?.data) {
            form.setFieldsValue(data?.data)
        }
    }, [data?.data, form])
    return (
        <div>
            <h1 className='text-yellow font-medium'>Edit Your Profile</h1>
            <div className='relative w-[140px] h-[124px] mx-auto'>
                <input type="file" onInput={handleChange} id='img' style={{ display: "none" }} />
                <img
                    style={{ width: 120, height: 120, borderRadius: "100%" }}
                    src={image ? URL.createObjectURL(image) : data?.data?.profile_image || img}
                    alt=""
                />

                <label
                    htmlFor="img"
                    className='
                            absolute top-[80px] right-4
                            bg-[var(--primary-color)]
                            rounded-full
                            w-6 h-6
                            flex items-center justify-center
                            cursor-pointer
                        '
                >
                    <div className='bg-yellow  p-1 rounded-full'>
                        <IoCameraOutline className="text-white " />
                    </div>
                </label>

            </div>

            <Form
                onFinish={onEditProfile}
                layout="vertical"
                form={form}
            >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
                    <div>
                        <Form.Item
                            name="name"
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
                                placeholder="Asadujjaman"
                            />
                        </Form.Item>
                        <Form.Item
                            name="date_of_birth"
                            label={<p className=" text-[16px] font-normal">Date of Birth</p>}
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
                                placeholder={`12/04/2002`}
                                type='date'
                            />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item
                            name="phone_number"
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
                        <Form.Item
                            name="location"
                            label={<p className="text-[#919191] text-[16px] leading-5 font-normal">address</p>}
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
                                placeholder="12/04/2002"
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
                        className={`p-5 bg-yellow rounded-md text-white ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        {
                            isLoading ? <Spin /> : ' Save  Changes'
                        }

                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditProfile