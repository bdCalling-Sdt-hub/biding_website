import { baseApi } from "./baseApi";

const winnerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //get 24 hr winners data 
        getWinner: builder.query({
            query: ({ status, page, category }) => ({
                url: `/auction?page=${page || 1}&limit=999999999${status ? `&status=${status}` : ''}${category ? `&category=${category}` : ""}`,//?last24Hours=true
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            }),
            providesTags: ['winner'],
        }),
    }),
})
export const {
    // get 24 hr winners data
    useGetWinnerQuery
} = winnerApi