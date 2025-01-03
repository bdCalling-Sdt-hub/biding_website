import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        registerUser : builder.mutation({
            query : (data)=>{
                (data);
                return {
                    url : '/user/auth/register',
                    method : "POST",
                    body : data,
                }
            }
        })
    })
})

export const { useRegisterUserMutation } = userApi;