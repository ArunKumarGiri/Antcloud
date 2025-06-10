import React from 'react';
import Image from 'next/image';

const SecondBlog = () => {
    return (
        <section className="min-h-screen w-full flex justify-center py-8 sm:py-12 md:py-16">
            <div className="w-full">
                <div className="flex flex-col items-center">
                    <div className="w-full flex justify-center mb-8 sm:mb-12">
                        <h2 className="text-3xl w-[60%] text-center pb-1 sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#05EBFB] to-[#DB19E5]">
                            Cloud Gaming vs. Traditional Gaming: Exploring the Pros and Cons
                        </h2>
                    </div>

                    <p className="text-[16px] mt-[-2rem] sm:text-[18px] md:text-[20px] text-gray-600 dark:text-gray-300 w-full sm:w-[90%] md:w-[75%] lg:w-[65%] font-serif text-right">
                        By Garv Sharma
                    </p>

                    <div className="relative group mt-8 w-full sm:w-[90%] md:w-[80%] lg:w-[70%]">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] rounded-xl sm:rounded-2xl blur opacity-30"></div>
                        <div className="relative bg-white/80 dark:bg-black/70 p-2 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl">
                            <div className="relative w-full rounded-lg overflow-hidden z-10" style={{ paddingTop: '45%' }}>
                                <Image
                                    src="/Blogs/blog2.png"
                                    alt="Blog"
                                    fill
                                    sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 70vw, 60vw"
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black rounded-lg"></div>
                            </div>

                            <div className="mt-8 space-y-6 sm:space-y-8">
                                <div className="prose dark:prose-invert max-w-none">
                                    <div className="space-y-4 sm:space-y-6">
                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                In recent years, the gaming industry has witnessed a revolutionary shift with the emergence of cloud gaming services like Ant Cloud alongside traditional gaming methods. This transition has sparked debates among gamers worldwide, each advocating for their preferred mode of gaming. In this article, we delve into the pros and cons of both cloud gaming and traditional gaming to help you make an informed decision.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                What is Cloud Gaming?
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Cloud gaming, also known as gaming on demand, is a service that allows users to stream video games from remote servers directly to their devices, eliminating the need for high-end hardware. Ant Cloud, an Indian cloud gaming service, is making waves in this arena, offering a vast library of games accessible on various devices with an internet connection.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                Pros of Cloud Gaming
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Cloud computing offers an array of benefits that are revolutionising the video editing process:
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                1. Accessibility
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                One of the primary advantages of cloud gaming is its accessibility. With Ant Cloud, gamers can enjoy their favourite titles on any device, whether it&#39;s a smartphone, tablet, or low-spec PC, as long as they have a stable internet connection.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                2. Cost-Efficiency
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Cloud gaming eliminates the need for expensive gaming hardware, making it a cost-effective option for gamers. Instead of investing in high-end consoles or PCs, users can subscribe to Ant Cloud&#39;s service at a fraction of the cost.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                3. Instant Play
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Unlike traditional gaming, which often involves lengthy downloads and installations, cloud gaming offers instant access to games. Users can start playing their favourite titles within seconds, without waiting for updates or installations.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                4. Scalability
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Cloud gaming platforms like Ant Cloud have the advantage of scalability, allowing them to expand their game libraries and server capacities rapidly. This ensures that gamers always have access to the latest titles and seamless gaming experiences.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                Cons of Cloud Gaming
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Internet Dependence: The biggest drawback of cloud gaming is its reliance on a stable internet connection. Any disruptions in internet connectivity can lead to lag, buffering, or even disconnection from the game, hampering the overall gaming experience.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                Latency Issues
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Despite advancements in technology, cloud gaming still faces latency issues, especially in fast-paced multiplayer games. This delay between user input and on-screen action can be frustrating for gamers, particularly in competitive environments.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                Quality Concerns
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                The quality of cloud gaming experiences heavily depends on the user&#39;s internet speed and the performance of the cloud servers. Lower internet speeds or server congestion can result in reduced graphics quality and resolution, diminishing the overall gaming experience.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                Traditional Gaming
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                On the other hand, traditional gaming involves playing games directly on gaming consoles, PCs, or handheld devices without relying on internet streaming. While traditional gaming may require upfront investments in hardware, it offers certain advantages such as offline play, higher graphical fidelity, and greater control over gaming environments.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                Conclusion
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Both cloud gaming and traditional gaming have their own set of pros and cons, catering to different preferences and requirements. While cloud gaming offers unparalleled accessibility and cost-efficiency, it comes with limitations such as internet dependence and latency issues. On the contrary, traditional gaming provides superior graphics quality and offline play capabilities but requires significant hardware investments.
                                            </p>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                                                Ultimately, the choice between cloud gaming and traditional gaming boils down to personal preferences, internet connectivity, and gaming priorities. Whether you opt for the convenience of cloud gaming with Ant Cloud or the immersive experience of traditional gaming, the most important thing is to enjoy the games you love, regardless of the platform you choose.
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

export default SecondBlog;
