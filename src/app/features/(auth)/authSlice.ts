import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { registerUser, sendOTP, userEmailLogin, userPhoneLogin, verifyOTP } from './authActions'

interface UserInfo {
    id: string;
    firstName: string;
    currentPlan?: string;
    location?: string;
    emailVerified?: boolean;
}

interface AuthState {
    loading: boolean;
    userInfo: UserInfo | null;
    userToken: string | null;
    userRefreshToken: string | null;
    error: string | null;
    success: boolean;
    loggedIn: boolean;
    message: string | null;
    otpVerifiedMessage: boolean;
    otpVerifiedError: string | null;
}

const userToken = typeof window !== 'undefined' ? localStorage.getItem('antcloud-token') : null;
const userRefreshToken = typeof window !== 'undefined' ? localStorage.getItem('antcloud-refresh') : null;

const initialState: AuthState = {
    loading: false,
    userInfo: null,
    userToken,
    userRefreshToken,
    error: null,
    success: false,
    loggedIn: false,
    message: null,
    otpVerifiedMessage: false,
    otpVerifiedError: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetErrorAndMessage: (state) => {
            state.error = null;
            state.message = null;
            state.success = false;
            state.otpVerifiedError = null;
            state.otpVerifiedMessage = false;
        },

        refreshTokens: (state, { payload }: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
            if (typeof window !== 'undefined') {
                localStorage.setItem("antcloud-token", payload.accessToken);
                localStorage.setItem("antcloud-refresh", payload.refreshToken);
            }
            state.userToken = payload.accessToken;
            state.userRefreshToken = payload.refreshToken;
        },

        setUserPlan: (state, { payload }) => {
            state.userInfo = payload;
        },

        logout: (state) => {
            if (typeof window !== 'undefined') {
                localStorage.clear();
            }
            state.loggedIn = false;
            state.userInfo = null;
            state.userRefreshToken = null;
            state.userToken = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOTP.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.message = payload;
                state.success = true;
            })
            .addCase(sendOTP.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as string;
            })
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
                state.otpVerifiedError = null;
            })
            .addCase(verifyOTP.fulfilled, (state) => {
                state.loading = false;
                state.otpVerifiedMessage = true;
            })
            .addCase(verifyOTP.rejected, (state, { payload }) => {
                state.loading = false;
                state.otpVerifiedError = (payload as { message: string }).message;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                const { token, refreshToken, ...newPayload } = payload;
                state.loading = false;
                state.userInfo = newPayload;
                state.userToken = token;
                state.userRefreshToken = refreshToken;
                state.loggedIn = true;
                state.success = true;
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as string;
            })
            .addCase(userEmailLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userEmailLogin.fulfilled, (state, { payload }) => {
                const { token, refreshToken, ...newPayload } = payload;
                state.loading = false;
                state.userInfo = newPayload;
                state.userToken = token;
                state.userRefreshToken = refreshToken;
                state.success = true;
                state.loggedIn = true;
            })
            .addCase(userEmailLogin.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as string;
            })
            .addCase(userPhoneLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userPhoneLogin.fulfilled, (state, { payload }) => {
                const { token, refreshToken, ...newPayload } = payload;
                state.loading = false;
                state.userInfo = newPayload;
                state.userToken = token;
                state.userRefreshToken = refreshToken;
                state.success = true;
                state.loggedIn = true;
            })
            .addCase(userPhoneLogin.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as string;
            });
    },
});

export const { resetErrorAndMessage, refreshTokens, setUserPlan, logout } = authSlice.actions;
export default authSlice.reducer;