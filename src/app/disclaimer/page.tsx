import React from "react"

export default function Disclaimer() {
    return (
        <section className="min-h-screen py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col items-center">
                    <div className="w-full text-center mb-8 sm:mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] bg-clip-text text-transparent">
                            Disclaimer
                        </h2>
                        <div className="w-30 sm:w-44 h-1 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] mx-auto mt-1 sm:mt-2 rounded-full"></div>
                    </div>

                    <div className="w-full max-w-4xl">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] rounded-xl sm:rounded-2xl blur opacity-30 "></div>
                            <div className="relative bg-white/80 dark:bg-black/70 p-4 sm:p-6 md:p-8 lg:p-12 rounded-xl sm:rounded-2xl shadow-xl">
                                <div className="prose dark:prose-invert max-w-none">
                                    <div className="space-y-4 sm:space-y-6 cursor-default">
                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">Steam, Valve &amp; Steam software</h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Steam©, Valve &amp; Steam software are all property of the Valve Corporation.
                                            </p>
                                        </div>
                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">Epic Games</h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Epic, Epic Games, the Epic Games logo, are trademarks or registered trademarks of Epic Games, Inc. in the United States of America and elsewhere.
                                            </p>
                                        </div>
                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">Other Trademarks</h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                All trademarks are property of their respective owners in the US and other countries.
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
    )
}