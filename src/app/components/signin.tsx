"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
// import { Eye, EyeOff } from "lucide-react"
import {
    sendOTP,
    userEmailLogin,
    userPhoneLogin,
} from "../features/(auth)/authActions";
import { resetErrorAndMessage } from "../features/(auth)/authSlice";
import { AppDispatch, RootState } from "../store";
import validator from "validator";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";


export const SignIn = () => {
    const [isPhone, setIsPhone] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const [resendAvailable, setResendAvailable] = useState(false);
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        phoneNumber: "",
    });
    const dispatch: AppDispatch = useDispatch();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    const { userInfo, success, error, loggedIn, message } = useSelector(
        (state: RootState) => state.auth
    );

    const [tvCode, setTvCode] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (showOtpInput && timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        } else if (timer === 0 && interval) {
            setResendAvailable(true);
            clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [showOtpInput, timer]);

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhoneNumber(value);
        setErrors((prev) => ({
            ...prev,
            phoneNumber: value.length !== 10 ? "Phone number must be 10 digits" : "",
        }));
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setErrors((prev) => ({
            ...prev,
            email: validator.isEmail(value) ? "" : "Invalid email address",
        }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setErrors((prev) => ({
            ...prev,
            password: value.length < 6 ? "Password must be at least 6 characters" : "",
        }));
    };

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOTPKeyDown = (
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Backspace" && index > 0 && !otp[index]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isPhone) {
            if (!showOtpInput) {
                if (phoneNumber.length === 10) {
                    dispatch(sendOTP({ phone: `+91${phoneNumber}`, signup: false }));
                    setShowOtpInput(true);
                    setTimer(30);
                    setResendAvailable(false);
                } else {
                    // Add a test toast to see if the system works
                    toast.error("Enter a valid 10 digit phone number");
                }
            } else {
                if (otp.join("").length === 6) {
                    dispatch(
                        userPhoneLogin({
                            phone: `+91${phoneNumber}`,
                            _verificationToken: otp.join(""),
                            otp: "",
                        })
                    );

                } else {
                    toast.error("Enter a valid 6 digit OTP");
                }
            }
        } else {
            submitEmailForm({ email, password });
        }
    };

    const submitEmailForm = (formData: { email: string; password: string }) => {
        if (formData.email === "" || !validator.isEmail(formData.email)) {
            toast.error("Invalid Email Address.");
        } else if (formData.password === "") {
            toast.error("Password Field cannot be empty.");
        } else {
            formData.email = formData.email.toLowerCase();
            dispatch(userEmailLogin(formData));

        }
    };

    const resendOtp = () => {
        if (phoneNumber.length === 10) {
            dispatch(sendOTP({ phone: `+91${phoneNumber}` }));
            setOtp(["", "", "", "", "", ""]);
            setTimer(30);
            setResendAvailable(false);
        }
    };


    useEffect(() => {
        if (success && message) {
            console.log('Success message:', message);
            toast.success(message);
            dispatch(resetErrorAndMessage());
        }

        if (error) {
            console.log('Error message:', error);
            toast.error(error);
            dispatch(resetErrorAndMessage());
        }

        if (userInfo && loggedIn && success) {
            toast.success(`Welcome Back ${userInfo.firstName}!`);
            console.log('User info:', userInfo.firstName);
            dispatch(resetErrorAndMessage());

            if (tvCode) router.push("/");
            else if (window.matchMedia("only screen and (max-width: 992px)").matches)
                router.push("/downloads");
            else if (userInfo.currentPlan === "Basic") router.push("/pricing");
            else router.push("/stream");
        }
    }, [success, message, error, userInfo, loggedIn]);

    useEffect(() => {
        const qrAuthId = localStorage.getItem("_antCQR");
        if (qrAuthId) {
            const [, code] = qrAuthId.split("^");
            setTvCode(code);
        }

        if (
            loggedIn &&
            window.matchMedia("only screen and (max-width: 992px)").matches
        ) {
            router.push("/downloads");
        } else if (loggedIn && qrAuthId) {
            router.push("/");
        } else if (loggedIn) {
            router.push("/");
        }
    }, [loggedIn]);

    // useEffect(() => {
    //     router.push('/service/updates')
    // }, [])

    return (
        <>
            {/* Updated ToastContainer with higher z-index and position */}

            <div className="flex flex-col items-center justify-center h-[35rem] lg:min-h-screen lg:mt-[-5rem] px-4">
                <img
                    src="Rectangle.png"
                    alt=""
                    className="z-10 absolute blur-[10px] w-[52rem] mt-[-20rem] lg:ml-[-48rem] lg:mt-[-8rem] lg:block"
                />
                <div className="bg-black dark:bg-white rounded-4xl shadow-lg p-6 w-full sm:w-[80%] md:w-[60%] lg:w-[40%] z-20">
                    <div className="hover:scale-102 duration-150 ease-linear flex border-b border-gray-400">
                        <button
                            onClick={() => {
                                setIsPhone(true);
                                setShowOtpInput(false);
                            }}
                            className={`hover:scale-105 duration-150 ease-linear flex-1 py-2 text-center text-[15px] text-white dark:text-black rounded-t-4xl font-semibold ${isPhone ? "bg-[#89dcff]" : ""}`}
                        >
                            Sign in via Phone
                        </button>
                        <button
                            onClick={() => {
                                setIsPhone(false);
                                setShowOtpInput(false);
                            }}
                            className={`hover:scale-105 duration-150 ease-linear flex-1 py-2 text-center text-[15px] text-white dark:text-black rounded-t-4xl font-semibold ${!isPhone ? "bg-[#f990ff]" : ""}`}
                        >
                            Sign in via Email
                        </button>
                    </div>

                    <h2 className="text-center text-xl font-semibold text-white dark:text-black mt-8">
                        Great to see you again!
                    </h2>

                    <AnimatePresence mode="wait">
                        {isPhone ? (
                            <motion.form
                                key="phone-form"
                                onSubmit={handleSubmit}
                                className="mt-6 flex flex-col items-center"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="hover:scale-103 transition-transform duration-100 ease-linear flex items-center border dark:bg-gray-200 bg-white shadow-md dark:border-0 border-black rounded-4xl w-[90%] overflow-hidden">
                                    <span className="px-3 text-black font-medium">+91</span>
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        value={phoneNumber}
                                        maxLength={10}
                                        required
                                        onChange={handlePhoneNumberChange}
                                        className="flex-1 py-2 px-3 focus:outline-none placeholder-gray-400 text-black"
                                    />
                                </div>
                                {errors.phoneNumber && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                                )}
                                {showOtpInput && (
                                    <>
                                        <div className="flex gap-3 w-[90%] items-center justify-center mt-8 hover:scale-103 transition-transform duration-100 ease-linear">
                                            {otp.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    maxLength={1}
                                                    value={digit}
                                                    required
                                                    ref={(el) => { inputRefs.current[index] = el; }}
                                                    onKeyDown={(e) => handleOTPKeyDown(index, e)}
                                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                                    className="w-8 h-8 text-center border border-black rounded-md dark:bg-gray-200 bg-white dark:border-0 text-black text-base shadow-md focus:ring-2 focus:ring-blue-300"
                                                />
                                            ))}
                                        </div>
                                        <div className="mt-3 text-sm text-white dark:text-black">
                                            {resendAvailable ? (
                                                <button
                                                    type="button"
                                                    onClick={resendOtp}
                                                    className="text-blue-500 hover:underline font-semibold"
                                                >
                                                    Resend OTP
                                                </button>
                                            ) : (
                                                <p className="text-gray-300 dark:text-gray-600">Resend OTP in {timer}s</p>
                                            )}
                                        </div>
                                    </>
                                )}
                                <button
                                    type="submit"
                                    className="w-[90%] h-[3rem] mt-6 py-2 bg-gradient-to-r from-[#05b1fb] to-[#DB19E5] text-black dark:text-white font-semibold rounded-4xl shadow-xl hover:opacity-90 hover:scale-103 transition-transform duration-150 ease-linear text-[16px]"
                                >
                                    {showOtpInput ? "Verify OTP" : "Verify with OTP"}
                                </button>
                                {!showOtpInput && (
                                    <p className="mt-4 text-white dark:text-black text-[15px]">
                                        Not registered yet?{" "}
                                        <a href="/signup" className="text-blue-500 font-semibold hover:underline">
                                            Create an Account
                                        </a>
                                    </p>
                                )}
                            </motion.form>
                        ) : (
                            <motion.form
                                key="email-form"
                                onSubmit={handleSubmit}
                                className="mt-6 flex flex-col items-center"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="w-[90%] flex items-center bg-white dark:bg-gray-200 border dark:border-0 border-black rounded-4xl mb-2 overflow-hidden shadow-md hover:scale-103 transition-transform duration-100 ease-linear">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        required
                                        onChange={handleEmailChange}
                                        className="flex-1 py-2 px-3 focus:outline-none placeholder-gray-400 text-black"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
                                <div className="w-[90%] flex items-center border dark:bg-gray-200 shadow-md dark:border-0 bg-white border-black rounded-4xl mb-2 overflow-hidden hover:scale-103 transition-transform duration-100 ease-linear relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        required
                                        onChange={handlePasswordChange}
                                        className="flex-1 py-2 px-3 focus:outline-none placeholder-gray-400 text-black"

                                    />
                                    <button
                                        type="button"
                                        className="absolute right-4 lg:top-1/2 lg:mt-0 mt-[1rem] lg:mr-0 mr-[3.2rem] transform -translate-y-1/2 text-gray-500 hover:text-black"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}
                                <button
                                    type="submit"
                                    className="w-[90%] h-[3rem] mt-4 py-2 bg-gradient-to-r from-[#05b1fb] to-[#DB19E5] text-black dark:text-white font-semibold rounded-4xl shadow-xl hover:opacity-90 hover:scale-103 transition-transform duration-150 ease-linear text-[16px]"
                                >
                                    Sign In
                                </button>
                                <p className="mt-4 text-white dark:text-black text-[15px]">
                                    Not registered yet?{" "}
                                    <a href="/signup" className="text-blue-500 font-semibold hover:underline">
                                        Create an Account
                                    </a>
                                </p>
                                <p className="mt-2 text-white dark:text-black text-[15px]">
                                    <Link href="/forgotPassword" className="text-blue-500 font-semibold hover:underline">
                                        Forgot Password?
                                    </Link>
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};