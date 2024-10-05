import { baseApi } from "./baseApi";

const paymentApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //create payment intant
        createPaymentIntent: builder.mutation({
            query: (data) => {
                return {
                    url: `/payment/create-payment-intent`,
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['payment']
        }),
        // confirm payment 
        confirmPayment: builder.mutation({
            query: (data) => ({
                url: '/payment/execute-payment-with-credit',
                method: 'POST',
                body: data
            })
        }),
        // paypal confirm payment 
        paypalConfirmPayment: builder.mutation({
            query: (data) => ({
                url: '/payment/execute-payment',
                method: 'POST',
                body: data
            })
        }),
        //paypal create payment
        paypalCreatePayment: builder.mutation({
            query: (data) => ({
                url: '/payment/create-payment',
                method: 'POST',
                body: data
            })
        }),
        myOrder :builder.query({
            query : ()=>{
                return {
                    url :'/order/my-orders',
                    method : 'GET' 
                }
            }
        }),
        getSingleOrder :  builder.query({
            query : (id)=>{
                return {
                    url : `/order/get-single-order/${id}`,
                    method : 'GET'
                }
            }
        }),
        getFinancialPayment : builder.query({
            query : (orderType) =>{
                return {
                    url : `/order/my-orders?orderType=FINANCE`,
                    method : 'GET',
                }
            }
        })
    })
})
export const {
    useGetFinancialPaymentQuery,
    useGetSingleOrderQuery,
    // create payment mutation 
    useCreatePaymentIntentMutation,
    // confirm  payment 
    useConfirmPaymentMutation,
    // paypal confirm payment 
    usePaypalConfirmPaymentMutation,
    // paypal create payment  
    usePaypalCreatePaymentMutation,
    useMyOrderQuery
} = paymentApis