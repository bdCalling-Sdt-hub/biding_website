import { baseApi } from "./baseApi";

const manageApis = baseApi.injectEndpoints({

    endpoints: (build) => ({
        // get notification
        getNotification: build.query({
            query: ({ page, limit }) => ({
                url: `/notification/get-all-notification?page=${page || 1} &limit=${limit || 10}`,
                method: 'GET',
            }),
        }),
        // read notification
        readNotification: build.mutation({
            query: () => ({
                url: `/notification/see-notification`,
                method: 'PATCH',
                body: {}
            }),
            invalidatesTags: ['notification']
        }),
        // get about us 
        getAboutUs: build.query({
            query: () => ({
                url: '/manage/about-us',
                method: 'GET',
            }),
        }),
        // get privacy policy 
        getPrivacyPolicy: build.query({
            query: () => ({
                url: '/manage/get-privacy-policy',
                method: 'GET',
            }),
        }),
        // get terms and conditions
        getTermsAndConditions: build.query({
            query: () => ({
                url: '/manage/get-terms-conditions',
                method: 'GET',
            }),
        }),
        // get Help
        getHelp: build.query({
            query: () => ({
                url: '/manage/get-help',
                method: 'GET',
            }),
        }),
        // get Contact 
        getContact: build.query({
            query: () => ({
                url: 'manage/get-contact-us',
                method: 'GET',
            }),
        }),
        // get Tips 
        getTips: build.query({
            query: () => ({
                url: '/manage/tips-and-tricks',
                method: 'GET',
            }),
        }),
        //get accessibility
        getAccessibility: build.query({
            query: () => ({
                url: '/manage/accessibility',
                method: 'GET',
            }),

        }),
        //  FAQ api 
        getFaq : build.query({
            query : ()=>{
                return {
                    url : '/manage/all-faq',
                    method : 'GET'
                }
            },
            providesTags : ['faq']
        }),

    }),
})
export const {
    useGetFaqQuery,
    // get notification
    useGetNotificationQuery,
    // read notification
    useReadNotificationMutation,
    // get about us
    useGetAboutUsQuery,
    // get privacy policy 
    useGetPrivacyPolicyQuery,
    // get terms and conditions
    useGetTermsAndConditionsQuery,
    // get Help
    useGetHelpQuery,
    // get Contact
    useGetContactQuery,
    // get Tips
    useGetTipsQuery,
    // get accessibility
    useGetAccessibilityQuery
} = manageApis