import React from 'react';
import Image from 'next/image';

const FirstBlog = () => {
    return (
        <section className="min-h-screen w-full flex justify-center py-8 sm:py-12 md:py-16">
            <div className="w-full">
                <div className="flex flex-col items-center">
                    <div className="w-full flex justify-center mb-8 sm:mb-12">
                        <h2 className="text-3xl w-[60%] text-center pb-1 sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#05EBFB] to-[#DB19E5]">
                            Revolutionising Video Editing: The Impact of Cloud Computing, Featuring Ant Cloud
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
                                    src="/Blogs/blog1.png"
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
                                                In the digital era, where content creation reigns supreme, the demands for high-quality video editing are escalating rapidly. From amateur vloggers to professional filmmakers, everyone seeks seamless editing processes that not only save time but also elevate the quality of their creations. In this transformative landscape, cloud computing emerges as a game-changer, reshaping the world of video editing as we know it.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                The Evolution of Video Editing
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Gone are the days when video editing was confined to bulky desktops loaded with expensive software. Traditional editing setups often faced limitations in terms of processing power, storage capacity, and collaboration capabilities. However, with the advent of cloud computing, these barriers are breaking down, paving the way for a new era of video editing.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                The Power of Cloud Computing in Video Editing
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Cloud computing offers an array of benefits that are revolutionising the video editing process:
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                1. Scalability
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Cloud-based video editing platforms provide unmatched scalability, allowing users to scale their resources up or down based on project requirements. Whether it&#39;s a small-scale project or a large-scale production, cloud computing ensures that editing resources are readily available, eliminating the need for costly hardware upgrades.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                2. Accessibility
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                One of the most significant advantages of cloud computing is its accessibility. Editors can access their projects from anywhere in the world, as long as they have an internet connection. This flexibility enables seamless collaboration among team members spread across different locations, streamlining the editing workflow.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                3. Cost-Effectiveness
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Cloud-based video editing solutions eliminate the need for hefty upfront investments in hardware and software licences. Instead, users can opt for subscription-based models, paying only for the resources they use. This cost-effective approach democratises video editing, making it accessible to creators with varying budgets.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                4. Performance
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                With advancements in cloud technology, editing tasks that once required powerful workstations can now be seamlessly executed in the cloud. Cutting-edge GPUs, such as the Nvidia A4000, deliver unparalleled performance, accelerating rendering times and enhancing real-time editing capabilities. This ensures a smooth editing experience, even when working with high-resolution footage and complex visual effects.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                Ant Cloud: Empowering Video Editors in India
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Amidst the rapidly evolving landscape of cloud computing, Ant Cloud stands out as a pioneering force, providing cutting-edge cloud computing services tailored to the needs of video editors in India. With its state-of-the-art infrastructure and robust GPU capabilities, Ant Cloud is redefining the possibilities of cloud-based video editing.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                Nvidia A4000 GPUs: Unleashing Creativity
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                At the heart of Ant Cloud&#39;s offering lies the Nvidia A4000 GPU, renowned for its exceptional performance in graphic-intensive applications. Equipped with powerful CUDA cores and AI-enhanced capabilities, the A4000 accelerates rendering speeds, enabling editors to bring their creative visions to life with unparalleled efficiency.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                Seamless Integration and Support
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                Ant Cloud goes beyond providing high-performance infrastructure; it offers seamless integration with leading video editing software, ensuring compatibility and ease of use for editors. Moreover, Ant Cloud&#39;s dedicated support team is available round-the-clock to assist users, offering guidance and troubleshooting to optimise their editing experience.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                Embracing the Future of Video Editing
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                As we journey into the future, the role of cloud computing in video editing will continue to evolve, driven by technological advancements and changing user demands. With solutions like Ant Cloud leading the way, video editors have unprecedented access to resources that empower their creativity and streamline their workflows. The days of hardware limitations and geographical constraints are behind us; welcome to a world where the sky&#39;s the limit for video editing possibilities.
                                            </p>
                                        </div>

                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                In conclusion, cloud computing is not just changing the world of video editing; it&#39;s revolutionising it. With Ant Cloud&#39;s innovative services and the power of Nvidia A4000 GPUs, the future of video editing in India and beyond looks brighter than ever. Whether you&#39;re a seasoned professional or an aspiring creator, the cloud is your gateway to limitless creativity.
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

export default FirstBlog;
