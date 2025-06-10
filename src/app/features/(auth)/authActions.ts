import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { setCredentials } from './userSlice';

const backendURL = 'https://api.antcloud.co/api'

interface SendOTPPayload {
    phone: string;
    signup?: boolean;
}

interface VerifyOTPPayload {
    phone: string;
    _verificationToken: string;
    otp: string
}

interface RegisterPayload {
    fName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    loc: {
        State: string;
        Pincode: string;
    };
    source: string;
}

interface LoginPayload {
    email: string;
    password: string;
}

export const sendOTP = createAsyncThunk(
    'auth/sendotp',
    async ({ phone, signup }: SendOTPPayload, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                `${backendURL}/phone/otp`,
                { phone, signup },
                config
            )
            return data.message
        } catch (error: any) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue("Something Went Wrong")
            }
        }
    }
)

export const verifyOTP = createAsyncThunk(
    'auth/verifyotp',
    async ({ phone, _verificationToken }: VerifyOTPPayload, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                `${backendURL}/phone/verify`,
                { phone, _verificationToken },
                config
            )

            return data.message
        } catch (error: any) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.response.data.message || "Something went wrong.");

            }
        }
    }
)

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ fName, lastName, email, password, phone, loc, source }: RegisterPayload, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                `${backendURL}/users`,
                { firstName: fName, lastName, email, password, phone, location: loc, source },
                config
            )

            localStorage.setItem('antplay-token', data.doc.token);
            const { id, firstName, currentPlan, location, token, refreshToken, emailVerified } = data.doc;
            const userDetails = { id, firstName, currentPlan, location, token, refreshToken, emailVerified };

            return userDetails
        } catch (error: any) {
            console.log(error)
            // return custom error message from backend if present
            if (error.response && error.response.data.errors.length > 0) {
                if (error.response.data.errors[0].data.length > 0) return rejectWithValue(error.response.data.errors[0].data[0].message)
                else return rejectWithValue(error.response.data.errors[0].message)
            } else {
                return rejectWithValue("Something went wrong")
            }
        }
    }
)

export const userEmailLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }: LoginPayload, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(
                `${backendURL}/users/login`,
                { email, password },
                config
            )
            const { id, firstName, currentPlan, location, token, refreshToken, emailVerified } = data.user;
            const userDetails = { id, firstName, location, currentPlan, token, refreshToken, emailVerified };

            localStorage.setItem('antcloud-token', token)
            localStorage.setItem('antcloud-refresh', refreshToken)
            return userDetails;
        } catch (error: any) {
            console.log('Login error response:', error.response?.data);
            // return custom error message from backend if present
            if (error.response && error.response.data.errors.length > 0) {
                return rejectWithValue(error.response.data.errors[0].message)
            } else {
                return rejectWithValue("Something Went Wrong.")
            }
        }
    }
)

export const userPhoneLogin = createAsyncThunk(
    'auth/phoneLogin',
    async ({ phone, _verificationToken }: VerifyOTPPayload, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(
                `${backendURL}/users/phone/login`,
                { phone, _verificationToken },
                config
            )
            const { id, firstName, currentPlan, location, token, refreshToken, emailVerified } = data.user;
            const userDetails = { id, firstName, currentPlan, location, token, refreshToken, emailVerified };

            localStorage.setItem('antcloud-token', token)
            localStorage.setItem('antcloud-refresh', refreshToken)
            return userDetails;
        } catch (error: any) {
            // return custom error message from backend if present
            if (error.response && error.response.data.errors.length > 0) {
                return rejectWithValue(error.response.data.errors[0].message)
            } else {
                return rejectWithValue("Something Went Wrong.")
            }
        }
    }
)
