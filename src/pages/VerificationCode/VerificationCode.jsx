import React, { useState } from 'react'
import OTPInput from 'react-otp-input'
import img from '../../assets/login.png'
import Button from '../../components/ui/Button';

const VerificationCode = () => {
    const [otp, setOtp] = useState("");

    const handleVerifyOtp =()=>{
        console.log(otp);
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 justify-center  items-center'>
            <div className='h-screen hidden md:block'>
                <img src={img} className='h-screen w-[100%]' alt="" />
            </div>
            <div className='mx-auto md:mx-0'>
                <h1 className='text-[40px] font-semibold mb-2'>Welcome back!</h1>
                <p className='mb-5'>Please log in to continue access</p>
                <div className='md:max-w-[45%] mx-auto md:mx-0 max-w-[100%] mb-5'>
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputStyle={{
                            height: "44px",
                            width: "44px",
                            borderRadius: "8px",
                            marginRight: "16px",
                            fontSize: "20px",
                            border: "1px solid #F3A211",
                            color: "#F3A211",
                            outline: "none"
                        }}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>
                <Button onClick={handleVerifyOtp} className='max-w-[40%]'>Countinue</Button>
            </div>


        </div>
    )
}

export default VerificationCode