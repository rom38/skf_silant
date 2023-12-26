// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = getState().auth.accessToken
            const tokenCSRF = getState().api.queries['getCSRF(undefined)']?.data?.csrf
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            if (tokenCSRF) {
                headers.set("X-CSRFToken", tokenCSRF)
            }
            return headers
        },
        credentials: "include",
    }),
    tagTypes: ['isAuth', 'machines', 'whoami'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login/',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['isAuth', 'machines',
                'whoami', 'maintenance', 'complaint'],
        }),
        machine: builder.mutation({
            query: (serial) => ({
                url: `machines/${serial}`,
                method: 'GET',
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'logout/',
                method: 'GET',
            }),
            invalidatesTags: ['isAuth',
                'machines', 'whoami', 'maintenance', 'complaint'],
        }),
        getCSRF: builder.query({
            query: () => "csrf/",
        }),
        getWhoAmI: builder.query({
            query: () => "whoami/",
            providesTags: ['whoami'],
        }),

        getIsAuth: builder.query({
            query: () => "isauth/",
            providesTags: ['isAuth'],
        }),
        getMachines: builder.query({
            query: () => "machines/",
            providesTags: ['machines'],
        }),
        getMaintenance: builder.query({
            query: () => "maintenance/",
            providesTags: ['maintenance'],
        }),
        createMaintenance: builder.mutation({
            query: (credentials) => ({
                url: 'maintenance/',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['maintenance'],
        }),
        getComplaint: builder.query({
            query: () => "complaint/",
            providesTags: ['complaint'],
        }),
        getCatalogs: builder.query({
            query: () => "catalogs/",
        }),
        getHistograms: builder.query({
            query: (data) => ({
                url: "objectsearch/histograms",
                method: 'POST',
                body: data,
            })
        }),
        getObjects: builder.query({
            query: (data) => ({
                url: "objectsearch",
                method: 'POST',
                body: data,
            })
        }),
        getDocuments: builder.query({
            query: (data) => ({
                url: "documents",
                method: 'POST',
                body: data,
            }),
            // transformResponse: (response) => {
            //     // console.log('response',response)
            //     return response[0].ok
            // }
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useGetCSRFQuery,
    useGetIsAuthQuery, useGetWhoAmIQuery,
    useGetHistogramsQuery, useGetObjectsQuery,
    useGetDocumentsQuery, useLogoutMutation, useGetMachinesQuery,
    useMachineMutation, useGetMaintenanceQuery, useGetComplaintQuery,
    useGetCatalogsQuery, useCreateMaintenanceMutation
} = api
