import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../store';

interface UserDetails {
    id: string;
}

interface UserState {
    userDetails: UserDetails | null;
}

let userId: string;

export const updateUserApi = createApi({
    reducerPath: 'updateUserApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.antcloud.co/api/',
        // baseUrl: 'http://localhost:8000/api/',
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.userToken;
            const userDetails = (state as any).user?.userDetails;
            userId = userDetails?.id ?? '';
            if (token) {
                headers.set('Authorization', `JWT ${token}`)
                return headers
            }
        },
    }),
    endpoints: (builder) => ({
        updateUserProfile: builder.mutation({
            query: (userData) => ({
                url: `users/${userId}`,
                method: 'PATCH',
                body: userData
            })
        })
    })
})

export const { useUpdateUserProfileMutation } = updateUserApi