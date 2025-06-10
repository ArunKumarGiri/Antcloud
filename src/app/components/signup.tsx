"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff } from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { registerUser, sendOTP, verifyOTP } from '../features/(auth)/authActions';

import { statesOfIndia } from '../assets/stateCity';
import validator from 'validator';
import { resetErrorAndMessage } from '../features/(auth)/authSlice';

export const SignUp = () => {
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [State, setState] = useState('');
  const [Pincode, setPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const [timer, setTimer] = useState(30);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [tvCode, setTvCode] = useState<string | null>(null);
  // const [isOtpSent, setIsOtpSent] = useState(false);
  // const [otpTimeLeft, setOTPTimeLeft] = useState(0);
  // const [hardTimer, setHardTimer] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    loc: {
      State: '',
      Pincode: '',
    },
    phoneNumber: '',
  });

  const { message, error, userInfo, loggedIn, success, otpVerifiedMessage, otpVerifiedError } = useSelector(
    (State: RootState) => State.auth
  );

  const length = 6;
  // const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));

  const startTimer = () => {
    setTimer(30);
    setResendAvailable(false);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(interval);
          setResendAvailable(true);
          return 0;
        }
      });
    }, 1000);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors((prev) => ({
      ...prev,
      password: e.target.value.length < 6 ? "Password must be at least 6 characters" : "",
    }));
  }
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setErrors((prev) => ({
      ...prev,
      confirmPassword: e.target.value !== password ? "Passwords do not match" : "",
    }));
  }
  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => setPincode(e.target.value);
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value);

  const handleOTPChange = (index: number, value: string) => {
    if (!isNaN(Number(value))) {
      const updatedOTP = [...otp];
      updatedOTP[index] = value;
      setOtp(updatedOTP);

      if (value && index < length - 1 && otpInputs.current[index + 1]) {
        otpInputs.current[index + 1]?.focus();
      }
    }
  };

  const handleOTPKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === 'Backspace' && index > 0 && !otp[index] && otpInputs.current[index - 1]) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleGetOtp = async () => {
    if (!validator.isMobilePhone(phoneNumber, 'en-IN')) {
      setErrors(prevErrors => ({ ...prevErrors, phoneNumber: 'Please Enter A Valid 10 Digit Indian Phone Number' }));
      return;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, phoneNumber: '' }));
    }

    setIsLoading(true);
    const phoneWithCode = `+91${phoneNumber}`;
    dispatch(sendOTP({ phone: phoneWithCode, signup: true }))
      .unwrap()
      .then(() => {
        setShowOtpInput(true);
        startTimer();

      })
      .catch((err) => {
        toast.error(err?.message || 'Failed to send OTP.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const resendOtp = async () => {
    setIsLoading(true);
    const phoneWithCode = `+91${phoneNumber}`;
    dispatch(sendOTP({ phone: phoneWithCode, signup: true }))
      .unwrap()
      .then(() => {
        setOtp(['', '', '', '', '', '']);
        startTimer();
        toast.success('OTP resent successfully!');
      })
      .catch((err) => {
        toast.error(err?.message || 'Failed to resend OTP.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentErrors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      loc: {
        State: '',
        Pincode: '',
      },
      phoneNumber: '',
    };
    let isValid = true;

    if (!fullName.trim()) {
      currentErrors.fullName = "Full Name field can't be blank.";
      isValid = false;
    }

    if (!email.trim() || !validator.isEmail(email)) {
      currentErrors.email = "Invalid Email Address.";
      isValid = false;
    }

    if (!password.trim() || password.length < 6) {
      currentErrors.password = "Password should be of at least 6 characters.";
      isValid = false;
    }

    if (confirmPassword !== password) {
      currentErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    if (!State) {
      currentErrors.loc.State = "State field cannot be empty.";
      isValid = false;
    }

    if (!Pincode.trim()) {
      currentErrors.loc.Pincode = "PIN code field cannot be empty.";
      isValid = false;
    } else if (Pincode.length !== 6 || !/^\d+$/.test(Pincode)) {
      currentErrors.loc.Pincode = 'Please enter a valid 6 digit PIN code.';
      isValid = false;
    }

    if (!phoneNumber.trim()) {
      currentErrors.phoneNumber = "Phone number cannot be empty.";
      isValid = false;
    } else if (!validator.isMobilePhone(phoneNumber, 'en-IN')) {
      currentErrors.phoneNumber = 'Please enter a valid 10 digit Indian phone number.';
      isValid = false;
    }

    setErrors(currentErrors);

    if (isValid && !showOtpInput) {
      handleGetOtp();
    } else if (isValid && showOtpInput) {
      if (otp.join('').length !== 6 || !/^\d+$/.test(otp.join(''))) {
        toast.error('OTP should be a 6 digit number.');
        return;
      }

      setIsLoading(true);

      dispatch(verifyOTP({
        phone: `+91${phoneNumber}`,
        _verificationToken: otp.join(''),
        otp: ''
      }))
        .unwrap()
        .then(() => {
          // OTP verified successfully, the next useEffect will handle registration
          toast.success('OTP verified successfully!');
        })
        .catch((err) => {
          toast.error(err?.message || 'Failed to verify OTP.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };


  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
    setPincode("");
    setErrors(prevErrors => ({ ...prevErrors, State: '' }));
  };


  useEffect(() => {
    if (otpVerifiedMessage) {
      // Reconstruct updated formData with fresh loc and source
      const names = fullName.trim().split(' ');
      const firstName = names[0] || '';
      const lastName = names.slice(1).join(' ') || '';
      const updatedFormData = {
        fName: firstName,
        lastName: lastName,
        email: email.toLowerCase(),
        password,
        phone: phoneNumber,
        source: query || 'Browser',
        loc: {
          State: String(State),
          Pincode: String(Pincode),
        },
      };

      console.log("Sending registration data:", updatedFormData);

      dispatch(registerUser(updatedFormData))
        .unwrap()
        .then(() => {
          toast.success('Registration successful!');
        })
        .catch((err) => {
          toast.error(err?.message || 'Registration failed.');
        });
    } else if (otpVerifiedError) {
      toast.error(otpVerifiedError);
    }
  }, [otpVerifiedMessage, otpVerifiedError, dispatch, fullName, email, password, phoneNumber, State, Pincode, query]);



  useEffect(() => {
    if (message && success && !otpVerifiedMessage) {
      // setIsOtpSent(true);
      setShowOtpInput(true);
      startTimer();
      toast.success(message);
      dispatch(resetErrorAndMessage());
    }
    if (error) {
      dispatch(resetErrorAndMessage());
      toast.error(error);
    }
    if (userInfo && loggedIn && success && otpVerifiedMessage) {

      if ((pathname === "/signup" && query.includes("source=SAM")) || tvCode) {
        router.push('/');
      } else if (window.matchMedia("only screen and (max-width: 992px)").matches) {
        router.push('/pricing');
      } else if (userInfo.currentPlan === "Basic") {
        router.push('/pricing');
      } else {
        router.push('/stream');
      }
      dispatch(resetErrorAndMessage());
    }
  }, [message, userInfo, success, error, loggedIn, router, query, tvCode, dispatch, otpVerifiedMessage]);

  useEffect(() => {
    const qrAuthId = localStorage.getItem("_antCQR");
    if (qrAuthId) {
      const [code] = qrAuthId.split("^");
      setTvCode(code);
    }

    if (loggedIn && window.matchMedia("only screen and (max-width: 992px)").matches) {
      router.push('/downloads');
    } else if (loggedIn && qrAuthId) {
      router.push('/');
    } else if (loggedIn) {
      router.push('/stream');
    }
  }, [loggedIn, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8">
      <ToastContainer />
      <img
        src="/Rectangle.png"
        alt=""
        className="z-10 blur-[10px] absolute w-[52rem] mt-[-40rem] ml-[1rem] lg:ml-[-48rem] lg:mt-[-14rem] lg:h-[63rem] lg:block"
      />

      <div className="bg-black dark:bg-white rounded-4xl shadow-lg p-6 w-full sm:w-[80%] md:w-[60%] lg:w-[40%] h-auto z-20">
        <div className="dark:text-black text-white text-center h-auto">
          <p className="font-semibold text-4xl">Get Started!</p>
          <p className="font-medium text-[15px] lg:mt-0 mt-[0.5rem] lg:p-[1rem] pb-[0.5rem] ">
            Welcome to Ant Cloud! Sign up by providing the details listed below.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!showOtpInput ? (
            <motion.form
              key="signup-form"
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-[90%] mb-4 hover:scale-103 transition-transform duration-100 ease-linear ">
                <input
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  required
                  onChange={handleFullNameChange}
                  disabled={isLoading}
                  className="w-full py-3 px-4 mt-[3rem] lg:mt-[1rem] rounded-full shadow-md focus:ring-2 transition-all duration-200 ease-in-out focus:ring-blue-300 placeholder-gray-400 focus:outline-none bg-white dark:bg-gray-200 text-black"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1 px-4">{errors.fullName}</p>
                )}
              </div>

              <div className="w-[90%] mb-4 hover:scale-103 transition-transform duration-100 ease-linear">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  required
                  onChange={handleEmailChange}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-full focus:outline-none bg-white focus:ring-2 focus:ring-blue-300 transition-all duration-200 ease-in-out placeholder-gray-400 dark:bg-gray-200 text-black"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 px-4">{errors.email}</p>}
              </div>

              <div className="w-[90%] mb-4 relative group hover:scale-103 transition-transform duration-100 ease-linear">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  required
                  autoComplete="new-password"
                  name="password"
                  aria-label="Password"
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  className="w-full py-3 px-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 ease-in-out placeholder-gray-400 bg-white shadow-md dark:bg-gray-200 text-black"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 px-4">{errors.password}</p>
                )}
              </div>

              <div className="w-[90%] mb-4 relative group hover:scale-103 transition-transform duration-100 ease-linear">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  required
                  autoComplete="new-password"
                  name="confirmPassword"
                  aria-label="Confirm Password"
                  onChange={handleConfirmPasswordChange}
                  disabled={isLoading}
                  className="w-full py-3 px-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 ease-in-out placeholder-gray-400 bg-white shadow-md dark:bg-gray-200 text-black"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1 px-4">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="relative w-[90%] mb-4 hover:scale-[1.03] transition-transform duration-100 ease-linear">
                <select
                  value={State}
                  onChange={handleStateChange}
                  required
                  disabled={isLoading}
                  className="w-full py-3 px-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 ease-in-out placeholder-gray-400 bg-white shadow-md dark:bg-gray-200 text-black appearance-none"
                >
                  <option value="" disabled hidden>
                    Select State
                  </option>
                  {statesOfIndia.map((State, index) => (
                    <option key={index} value={State.value}>{State.value}</option>
                  ))}
                </select>

                {/* Custom arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-600 mt-[6px]">
                  <svg className="h-10 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 7l3 3 3-3" />
                  </svg>
                </div>
                {errors.loc.State && (
                  <p className="text-red-500 text-sm mt-1 px-4">{errors.loc.State}</p>
                )}
              </div>


              <div className="w-[90%] mb-4 hover:scale-103 transition-transform duration-100 ease-linear">
                <input
                  type="text"
                  placeholder="PIN code"
                  value={Pincode}
                  maxLength={6}
                  required
                  onChange={handlePincodeChange}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 ease-in-out placeholder-gray-400 shadow-md bg-white dark:bg-gray-200 text-black"
                />
                {errors.loc.Pincode && (
                  <p className="text-red-500 text-sm mt-1 px-4">{errors.loc.Pincode}</p>
                )}
              </div>

              <div className="w-[90%] mb-4 hover:scale-103 transition-transform duration-100 ease-linear">
                <input
                  type="text"
                  placeholder="Phone number"
                  value={phoneNumber}
                  maxLength={10}
                  required
                  onChange={handlePhoneNumberChange}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 ease-in-out placeholder-gray-400 shadow-md bg-white dark:bg-gray-200 text-black"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1 px-4">{errors.phoneNumber}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-[90%] py-3 mt-2 bg-gradient-to-r from-[#05b1fb] to-[#DB19E5] text-black dark:text-white font-semibold rounded-full shadow-xl hover:opacity-90 hover:scale-103 transition-transform duration-150 ease-linear ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Sending OTP...' : 'Verify with OTP'}
              </button>

              <p className="mt-6 text-white dark:text-black text-center">
                Already have an account?{' '}
                <Link href="/signin" className="text-blue-500 font-semibold hover:underline">
                  Log In
                </Link>
              </p>
            </motion.form>
          ) : (
            <motion.form
              key="otp-form"
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="lg:mt-2  mt-[2rem] text-white dark:text-black text-center mb-4">
                Enter the 6-digit OTP sent to +91-{phoneNumber}
              </p>

              <div className="flex gap-3 w-[90%] items-center justify-center mb-6 hover:scale-103 transition-transform duration-100 ease-linear">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    required
                    ref={(el) => { otpInputs.current[index] = el; }}
                    disabled={isLoading}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleOTPKeyDown(index, e)}
                    className="w-10 h-12 text-center border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-300 transition-all duration-200 ease-in-out rounded-md bg-white dark:bg-gray-200 text-black text-lg "
                  />
                ))}
              </div>

              <div className="text-sm text-white dark:text-black mb-6 hover:scale-103 transition-transform duration-100 ease-linear">
                {resendAvailable ? (
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={isLoading}
                    className={`text-blue-500 hover:underline font-semibold ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    Resend OTP
                  </button>
                ) : (
                  <p className="text-gray-300 dark:text-gray-600">Resend OTP in {timer}s</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-[90%] py-3 bg-gradient-to-r from-[#05b1fb] to-[#DB19E5] text-white font-semibold rounded-full shadow-md hover:opacity-90 hover:scale-103 transition-transform duration-100 ease-linear  ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>

  );
};