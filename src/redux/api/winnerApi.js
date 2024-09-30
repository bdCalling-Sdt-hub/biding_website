import { baseApi } from "./baseApi";

const winnerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //get 24 hr winners data 
        getWinner: builder.query({
            query: ({ status, page, category }) => ({
                url: `/auction?page=${page || 1}${status ? `&status=${status}` : ''}${category ? `&category=${category}` : ""}`,//?last24Hours=true
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