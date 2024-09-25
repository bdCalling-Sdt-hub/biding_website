import { baseApi } from "./baseApi";

const winnerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //get 24 hr winners data 
        getWinner: builder.query({
            query: ({ status, page }) => ({
                url: `/auction?page=${page || 1}${status ? `&status=${status}` : ''}`,//?last24Hours=true
                method: 'GET',
            }),
            providesTags: ['winner'],
        }),
    }),
})
export const {
    // get 24 hr winners data
    useGetWinnerQuery
} = winnerApi