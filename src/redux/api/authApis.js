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
            query: (data) => ({
                url: '/user/auth/register',
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
    useRegisterMutation
} = authApis