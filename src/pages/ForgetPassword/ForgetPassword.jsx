import { Form, Input } from 'antd';
import img from '../../assets/login.png'
import { useForgetPasswordMutation } from '../../redux/api/authApis';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
// import { Button, Form, Input } from 'antd'
const ForgetPassword = () => {
    const navigate = useNavigate()
    // forget password form value handle function
    const [forgetPass] = useForgetPasswordMutation()
    const onFinish = (values) => {
        forgetPass(values).unwrap().then(res => {
            localStorage.setItem('email', JSON.stringify(values?.email))
            toast.success(res?.message)
            navigate('/otp')
        }).catch(err => {
            toast.error(err?.data?.message)
        })
    };
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 justify-center  items-center'>
            <div className='h-screen hidden md:block'>
                <img src={img} className='h-screen w-[100%]' alt="" />
            </div>
            <div className='mx-auto md:mx-0'>
                <h1 className='text-[40px] font-semibold mb-2 text-[#2E2E2E]'>Forget Password?</h1>
                <p className='mb-5 text-[#2E2E2E]'>Enter your email and we will send you a verification code</p>
                <div className='md:max-w-[45%] mx-auto md:mx-0 max-w-[100%] '>
                    <Form
                        layout='vertical'
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name={`email`}
                            label='Email'
                            rules={[
                                {
                                    message: 'Please Enter Your Email',
                                    required: true
                                }
                            ]}
                        >
                            <Input placeholder='please enter your email' type='email' className='h-[42px]' />
                        </Form.Item>
                        <button className='w-[100%] mt-4 bg-yellow  custom-button py-2 rounded-md'>
                            Continue
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword