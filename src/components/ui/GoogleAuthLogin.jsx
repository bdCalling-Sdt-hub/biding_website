import { GoogleLogin } from '@react-oauth/google';
import React from 'react'
import { toast } from 'sonner';
import { useGoogleLoginMutation } from '../../redux/api/authApis';
import { useNavigate } from 'react-router-dom';

const GoogleAuthLogin = () => {
    const [login] = useGoogleLoginMutation()
    const navigate = useNavigate()
    const decodeJWT = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    };
    const handleLoginSuccess = (response) => {
        if (response && response.credential) {
            try {
                const decoded = decodeJWT(response.credential);
                const data = {
                    name: decoded?.name || '',
                    email: decoded?.email || '',
                    profile_image: decoded?.picture || '',
                }
                login(data).unwrap()
                    .then((payload) => {
                        localStorage.setItem('token', JSON.stringify(payload.data.accessToken))
                        toast.success(payload.message || 'Login successfully')
                        navigate('/')
                    })
                    .catch((error) => {
                        (error)
                        toast.error(error.message || 'Something went wrong')
                    })
            } catch (error) {
                // 
                toast.error(error.message || 'Something went wrong')
            }
        } else {
            // console.error('No credential in the response.');
            toast.error('Something went wrong')
        }
    };
    const handleLoginFailure = (error) => {
        // Handle failure cases
        console.error('Login Failed:', error);
        toast.error(error.message || 'Something went wrong')
    };
    return (
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
        />
    )
}

export default GoogleAuthLogin
