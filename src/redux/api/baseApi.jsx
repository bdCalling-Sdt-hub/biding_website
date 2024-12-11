import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api.sellaze.com',
    // baseUrl: 'http://192.168.10.11:5000',
    prepareHeaders: (headers) => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQuery,
    tagTypes: ['overview', 'winner', 'bookmark', 'auctions', 'singleAuctions', 'address'],
    endpoints: () => ({})
});


export const imageUrl = 'https://api.sellaze.com'
// export const imageUrl = 'http://192.168.10.11:5000' 