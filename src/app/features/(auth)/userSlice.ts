import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    userDetails: null,
    error: null,
    success: false,
    message: null,
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, { payload }) => {
            state.userDetails = payload
        },
        removeCredentials: (state) => {
            state.userDetails = null
        }
    },
    extraReducers: (builder) => { },
});

export const { setCredentials, removeCredentials } = authSlice.actions;
export default authSlice.reducer