import { baseApi } from "./baseApi"

const authApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // login function
        login: builder.mutation({
            query: (data) => ({
                url: '/user/auth/login',
                method: 'POST',
                body: data
            })
        }),
        // register function
        register: builder.mutation({
            query: (values) => {
                return {
                    url: '/user/auth/register',
                    method: 'POST',
                    body: values
                }
            }
        }),
        // active Code function
        activeCode: builder.mutation({
            query: ({ activation_code, email }) => {
                console.log('data', { activation_code, email })
                return {
                    url: '/user/auth/activate-user',
                    method: 'POST',
                    body: { activation_code, email }
                }
            }
        }),
        // resend code 
        resendCode: builder.mutation({
            query: (data) => ({
                url: '/user/auth/resend-activation-code',
                method: 'POST',
                body: data
            })
        }),
    }),
})
export const {
    // login function
    useLoginMutation,
    // register function
    useRegisterMutation,
    // active Code function
    useActiveCodeMutation,
    // resend code
    useResendCodeMutation
} = authApis