import { baseApi } from "./baseApi";

const auctionsApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get actions 
        getAuctions: builder.query({
            query: ({ category }) => {
                return {
                    url: `/auction${category ? `?category=${category}` : ''}`,
                    method: 'GET'
                }
            },
            providesTags: ['auctions']
        }),
        // single auctions
        getSingleAuction: builder.query({
            query: (id) => {
                return {
                    url: `/auction/get-single-auction/${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['singleAuctions']
        })

    })
})
export const {
    // get auctions 
    useGetAuctionsQuery,
    // get single auctions
    useGetSingleAuctionQuery
} = auctionsApis