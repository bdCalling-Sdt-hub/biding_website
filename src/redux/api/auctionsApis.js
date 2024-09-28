import { baseApi } from "./baseApi";

const auctionsApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get actions 
        getAuctions: builder.query({
            query: () => {
                return {
                    url: '/auction',
                    method: 'GET'
                }
            },
            providesTags: ['auctions']
        }),

    })
})
export const {
    // get auctions 
    useGetAuctionsQuery
} = auctionsApis