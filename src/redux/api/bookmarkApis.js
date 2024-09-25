import { baseApi } from "./baseApi";

const bookmarkApis = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get bookmarek
        getBookmark: build.query({
            query: () => ({
                url: '/bookmark/my-bookmarks',
                method: 'GET',
            }),
            providesTags: ['bookmark', 'winner'],
        }),
        // add bookmark
        addBookmark: build.mutation({
            query: (data) => ({
                url: '/bookmark/create-bookmark',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['bookmark', 'winner'],
        }),
        // delete bookmark
        deleteBookmark: build.mutation({
            query: (id) => ({
                url: `/bookmark/delete-bookmark/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['bookmark', 'winner'],
        }),
    })
})
export const {
    useGetBookmarkQuery,
    useAddBookmarkMutation,
    useDeleteBookmarkMutation
} = bookmarkApis