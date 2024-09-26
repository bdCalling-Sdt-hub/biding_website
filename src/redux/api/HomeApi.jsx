import { baseApi } from "./baseApi";

const homeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBanner: builder.query({
            query: () => ({
                url: '/dashboard/get-banner',
                method: "GET"
            })
        })
    })
})
export const { useGetBannerQuery } = homeApi