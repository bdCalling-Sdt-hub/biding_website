import { baseApi } from "./baseApi";

const auctionsApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get actions 
        getAuctions: builder.query({
            query: ({ category, searchTerm, financeAvailable }) => {
                return {
                    url: `/auction?limit=999999999${category ? `&category=${category}` : ''}${searchTerm ? `&searchTerm=${searchTerm}` : ''}${financeAvailable ? `&financeAvailable=${financeAvailable}` : ''}`,
                    method: 'GET',
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                }
            },
            providesTags: ['auctions']
        }),
        // single auctions
        getSingleAuction: builder.query({
            query: (id) => {
                return {
                    url: `/auction/get-single-auction/${id}`,
                    method: 'GET',
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                }
            },

        }),
        // get bidding history
        getBiddingHistory: builder.query({
            query: () => ({
                url: `/auction/get-bidding-history`,
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            })
        })

    })
})
export const {
    // get auctions 
    useGetAuctionsQuery,
    // get single auctions
    useGetSingleAuctionQuery,
    // get bidding history
    useGetBiddingHistoryQuery
} = auctionsApis