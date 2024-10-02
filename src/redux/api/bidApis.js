import { baseApi } from "./baseApi";

// /order/my-bids
const bidApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get my bids
        getMyBids: builder.query({
            query: () => ({
                url: `/order/my-bids`,
                method: 'GET'
            }),
            providesTags: ['bids']
        })
    })
})
export const {
    // get my bids
    useGetMyBidsQuery
} = bidApis