import img from '../../assets/login.png'
import { Button,  Form, Input } from 'antd'

const ResetPassword = () => {

    /** handle reset password functionlity */
    const onFinish = (values)=>{
        console.log(values);
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 justify-center  items-center'>
            <div className='h-screen hidden md:block'>
                <img src={img} className='h-screen w-[100%]' alt="" />
            </div>
            <div className='mx-auto md:mx-0'>
                <h1 className='text-[40px] font-semibold mb-2'>Reset Passowrd</h1>
                <p className='mb-5'>Please enter a new password</p>
                <div className='md:max-w-[45%] mx-auto md:mx-0 max-w-[100%] '>
                    <Form
                        onFinish={onFinish}
                        layout="vertical"
                    >
                       
                        <Form.Item
                            label="New Password"
                            name='password'
                        >
                            <Input.Password placeholder='Enter your new password' />
                        </Form.Item>
                        <Form.Item
                            label="Confirm New Password"
                            name='confirmPassword'
                        >
                            <Input.Password placeholder='Confirm your new password' />
                        </Form.Item>
                       
                        <Form.Item

                        >
                            <Button type="primary" className='w-[100%] mt-4 bg-yellow  custom-button' htmlType="submit">
                                Reset Password
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>


        </div>
  )
}

export default ResetPassword