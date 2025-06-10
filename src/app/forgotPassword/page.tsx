"use client"
import React, { useEffect, useState } from "react";
import { forgotPassword } from "../services/(auth)/forgotPassword";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../store";
import CircularProgress from '@mui/material/CircularProgress';

export default function ForgotPassword() {
    const [page, setPage] = useState(0);
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { loggedIn } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (loggedIn) {
            router.push('/')
        }
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // router.push('service/updates');

        // Uncomment when downtime is over
        setIsLoading(true)
        forgotPassword(
            email,
            () => {
                toast.success("Email sent successfully!");
                setIsLoading(false)
                setPage(1);
            },
            () => {
                toast.error("Something went wrong! Try again later.");
                setIsLoading(false)
            }
        );
    }

    return (
        <section className="min-h-screen pb-48">
            <div className="container mx-auto px-4" data-aos="fade-up" data-aos-delay="300">
                {page === 0 ? (
                    <div className="max-w-md mx-auto bg-black dark:bg-white rounded-4xl shadow-lg p-8 mt-20">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white dark:text-black mb-4">Forgot Password!</h2>
                            <p className="text-gray-300 dark:text-gray-600">
                                Please enter your registered email address.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="w-full px-4 py-3 rounded-4xl bg-white dark:bg-gray-200 border border-gray-300 dark:border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-400"
                                placeholder="Email Id"
                            />
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-[#05b1fb] to-[#DB19E5] dark:text-white text-black font-medium rounded-4xl shadow-xl hover:opacity-90 hover:scale-103 transition-transform duration-150 ease-linear relative"
                            >
                                {isLoading ? <CircularProgress size={20} /> : 'Send Mail'}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <div className="max-w-2xl w-full bg-[#171717] dark:bg-gray-800 rounded-xl p-12 mt-12 text-center">
                            <h4 className="text-[#22B9A6] dark:text-green-400">
                                We have sent an email to {email}! If this email is connected to an Antcloud account, you can reset your password.
                            </h4>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}