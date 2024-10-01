import { baseApi } from "./baseApi";

const addressApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get my address 
        getMyAddress: builder.query({
            query: () => ({
                url: '/shipping/my-shipping-address',
                method: 'GET'
            }),
            providesTags: ['address']
        }),
        // update address id 
        updateAddress: builder.mutation({
            query: ({ id, data }) => ({
                url: `/shipping/update-shipping-address/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['address']
        })
    })
})
export const {
    //  get my address
    useGetMyAddressQuery,
    //update address
    // useLazyGetMyAddressQuery
    useUpdateAddressMutation,
} = addressApis