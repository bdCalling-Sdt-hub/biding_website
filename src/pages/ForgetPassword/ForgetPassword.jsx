import img from '../../assets/login.png'
import { Button, Checkbox, Form, Input } from 'antd'
import { AiFillGoogleCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';


const ForgetPassword = () => {
    // forget password form value handle function
    const onFinish = (values) => {
        ('Success:', values);
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

                        >
                            <Button type="primary" className='w-[100%] mt-4 bg-yellow  custom-button' htmlType="submit">
                                Countinue
                            </Button>
                        </Form.Item>
                    </Form>

                   
                </div>
            </div>


        </div>
    )
}

export default ForgetPassword