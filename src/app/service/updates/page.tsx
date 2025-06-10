"use client"
import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const isMobileDevice = () => {
    return window.matchMedia("only screen and (max-width: 992px)").matches;
}

export default function ServiceUpdate() {
    return (
        <section className="min-h-screen w-full flex justify-center items-center py-8 sm:py-12 md:py-16">
            <div className="w-[80%] max-w-6xl">
                <div className="flex flex-col items-center">
                    <div className="w-full text-center mb-8 sm:mb-12">
                        <h2 className="text-3xl pb-1 sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#05EBFB] to-[#DB19E5]">
                            Server Updates
                        </h2>
                        <div className="w-[10rem] sm:w-[15rem] h-1 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] mx-auto mt-1 sm:mt-2 rounded-full"></div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] rounded-xl sm:rounded-2xl blur opacity-30"></div>
                        <div className="relative bg-white/80 dark:bg-black/70 p-4 sm:p-6 md:p-8 lg:p-12 rounded-xl sm:rounded-2xl shadow-xl">
                            <div className="space-y-6 sm:space-y-8">
                                <div className="prose dark:prose-invert max-w-none">
                                    <div className="space-y-4 sm:space-y-6">
                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <Typography
                                                className="text-center text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-100 mb-6"
                                                component="div"
                                            >
                                                We want to inform you that our cloud services will be temporarily unavailable as we migrate to a new data center to enhance performance and reliability.
                                            </Typography>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                Downtime Schedule
                                            </h4>
                                            <div className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                                <p className="flex items-center gap-2">
                                                    <span className="text-[#05EBFB]">📅</span>
                                                    <span className="font-medium">Start: 19th February 2025</span>
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <span className="text-[#05EBFB]">📅</span>
                                                    <span className="font-medium">End: 12th March 2025</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                During this period, access to your services and data will be temporarily suspended. Rest assured, we are working to complete the transition as smoothly and quickly as possible.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                Compensation Plan
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Since our users will not have access to their virtual PCs for a week, they will be compensated with a one month extension on their existing plans along with whatever amount of hours that plan has. So, Rs 199 users get 35 hours, Rs 499 get 100 hours, etc. added to their account for free.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                Firmware Updates
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                                During this period, we will also be rolling out updates for our firmware, which include:
                                            </p>
                                            <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                                <li>Better internet bandwidth</li>
                                                <li>Higher visual quality for all streams</li>
                                                <li>Microphone access for users</li>
                                                <li>Lower CPU usage for our own streaming application</li>
                                            </ul>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                We apologize for any inconvenience and appreciate your patience. If you have any questions, please reach out to our support team at{' '}
                                                <a href="mailto:support@antcloud.co" className="text-[#05EBFB] hover:text-[#DB19E5] transition-colors duration-200">
                                                    support@antcloud.co
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};