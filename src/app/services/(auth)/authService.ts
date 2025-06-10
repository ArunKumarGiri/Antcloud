import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.antcloud.co/api/',
        // baseUrl: 'http://localhost:8000/api/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as { auth: { userToken: string } }).auth.userToken
            if (token) {
                headers.set('Authorization', `JWT ${token}`)
                return headers
            }
        },
    }),
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            query: () => ({
                url: 'users/me',
                method: 'GET',
            }),
            // Removed invalidatesTags as it is not assignable to the expected type
        })
    })
})

export const { useGetUserDetailsQuery } = authApi