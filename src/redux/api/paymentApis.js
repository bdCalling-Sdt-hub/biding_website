import { baseApi } from "./baseApi";

const paymentApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //create payment intant
        createPaymentIntent: builder.mutation({
            query: ({ amount }) => {
                console.log('amount', amount)
                return {
                    url: `/payment/create-payment-intent`,
                    method: 'POST',
                    body: { amount },
                }
            },
            invalidatesTags: ['payment']
        })
    })
})
export const {
    // create payment mutation 
    useCreatePaymentIntentMutation
} = paymentApis