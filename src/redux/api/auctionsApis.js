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
        getSingleAuction : builder.query({
            query : (id)=>{
                return {
                    url : `/auction/get-single-auction/${id}`,
                    method : 'GET'
                }
            }
        })

    })
})
export const {
    // get auctions 
    useGetAuctionsQuery, useGetSingleAuctionQuery
} = auctionsApis