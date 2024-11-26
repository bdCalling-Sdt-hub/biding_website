import React, { useState } from 'react'
import OTPInput from 'react-otp-input'
import img from '../../assets/login.png'
import Button from '../../components/ui/Button';
import { useActiveCodeMutation, useResendCodeMutation } from '../../redux/api/authApis';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const VerificationCode = () => {
    const [otp, setOtp] = useState("");
    const [activeCode, { isLoading }] = useActiveCodeMutation()
    const [resendCode, { isLoading: isResending }] = useResendCodeMutation()
    const handleVerifyOtp = () => {
        if (!otp) {
            toast.error("Please enter OTP")
        }
        const email = JSON.parse(localStorage.getItem("email"))
        activeCode({ activation_code: otp, email: email }).unwrap().then((payload) => {
            // (payload)
            if (payload?.success) {
                localStorage.setItem("token", JSON.stringify(payload?.data?.accessToken))
                localStorage.removeItem("email")
                toast.success(payload?.message || "Verified successfully")
                window.location.href = '/'
            }
        }).catch((error) => {
            toast.error(error?.data?.message || "Something went wrong")
            // (error)
        });
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
                <Button onClick={handleVerifyOtp} className='max-w-[40%]'>Continue</Button>
                <p>Didn't receive code? <button onClick={() => {
                    const email = JSON.parse(localStorage.getItem("email"))
                    resendCode({ email: email }).unwrap().then((payload) => {
                        if (payload?.success) {
                            toast.success(payload?.message || "Code sent successfully")
                        }
                    }).catch((error) => {
                        (error)
                        toast.error(error?.data?.message || "Something went wrong")
                    });
                }} className='text-[#F3A211]'>resend code</button></p>
            </div>


        </div>
    )
}

export default VerificationCode