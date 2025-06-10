import React from "react";

export default function Instructions() {
    return (
        <div className="min-h-screen">
            <section className="w-full py-20">
                <div className="w-full" data-aos="fade-up" data-aos-delay="300">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-full">
                            <h1 className="text-2xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] ">
                                Windows app instructions
                            </h1>
                        </div>
                        <div className="w-[13rem] sm:w-[30rem] h-1 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] mx-auto mt-[-10px] sm:mt-[-5px] rounded-full"></div>
                    </div>
                </div>
            </section>

            <div className="mx-auto h-full w-full pb-[5rem]">
                <div className="mx-auto max-w-[1200px] mt-[-2rem]">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] rounded-xl sm:rounded-2xl blur opacity-30"></div>
                        <div className="relative bg-white/80 dark:bg-black/70 p-4 sm:p-6 md:p-8 lg:p-12 rounded-xl sm:rounded-2xl shadow-xl">
                            <div className="space-y-6 sm:space-y-8">
                                <div className="prose dark:prose-invert max-w-none">
                                    <div className="space-y-4 sm:space-y-6">
                                        <div className="p-3 sm:p-2 rounded-lg sm:rounded-xl transition-colors duration-200">
                                            <h2 className="text-center mb-8 text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#05EBFB] to-[#DB19E5]">
                                                Welcome to the Step-by-Step Guide for our Windows App!
                                            </h2>
                                            <p className="text-lg leading-relaxed mb-8 text-gray-800 dark:text-gray-300">
                                                Please follow the instructions below to access your virtual PC using
                                                the Windows app:
                                            </p>
                                            <ol className="mb-8 space-y-6">
                                                {[
                                                    {
                                                        text: "Make sure you have downloaded & installed the Windows app on your local machine via ",
                                                        link: {
                                                            text: "this link",
                                                            href: "https://antplay-client-1f85c53a.s3.ap-south-1.amazonaws.com/windows/Antcloud.msi"
                                                        }
                                                    },
                                                    {
                                                        text: "Once you have installed the app, please go to ",
                                                        link: {
                                                            text: "this link",
                                                            href: "stream"
                                                        },
                                                        additional: " to access your virtual PC via the app. Please do not try to open the app on its own as it only works in tandem with our website."
                                                    },
                                                    {
                                                        text: "On the Windows app Dashboard page, click on the power button."
                                                    },
                                                    {
                                                        text: "Once you do, your PC will start & it can take upto 5 minutes to start the PC"
                                                    },
                                                    {
                                                        text: "Once done, you will be prompted to launch the Windows App. You can change your resolution, FPS & bitrate before launching"
                                                    },
                                                    {
                                                        text: "Once you click on launch PC, you will be prompted to \"Leave the App\" & once you select that you will be prompted to \"Launch AntCloud\" via your browser."
                                                    },
                                                    {
                                                        text: "Once you accept the prompts, your Windows App will launch automatically"
                                                    },
                                                    {
                                                        text: "To close the app please press on \"Ctrl + F9\" to close the app. Once done, you can close your VM via the Shut Down PC button or simply close the tab."
                                                    }
                                                ].map((item, index) => (
                                                    <li key={index} className="flex items-start group">
                                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#05EBFB]/20 text-[#05EBFB] mr-4 flex-shrink-0 group-hover:bg-[#05EBFB]/40 transition-colors">
                                                            {index + 1}
                                                        </span>
                                                        <span className="text-gray-800 dark:text-gray-300">
                                                            {item.text}
                                                            {item.link && (
                                                                <a
                                                                    href={item.link.href}
                                                                    className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                                                                >
                                                                    {item.link.text}
                                                                </a>
                                                            )}
                                                            {item.additional}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ol>
                                            <div className="mx-auto max-w-[800px] mt-8 p-3 sm:p-4 rounded-lg sm:rounded-xl transition-colors duration-200">
                                                <h3 className="text-xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#05EBFB] to-[#DB19E5]">Shortcuts for the app:</h3>
                                                <ul className="space-y-4">
                                                    {[
                                                        "To disconnect the session/close the app: \"Ctrl + F9\"",
                                                        "To exit/enter Fullscreen the application: \"Ctrl + F10\"",
                                                        "To unlock mouse when in Immersive mode: \"Ctrl + F8\"",
                                                        "To minimize the windows application: \"Ctrl + F7\""
                                                    ].map((shortcut, index) => (
                                                        <li key={index} className="flex items-center group">
                                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#05EBFB]/20 text-[#05EBFB] mr-4 flex-shrink-0 group-hover:bg-[#05EBFB]/30 transition-colors">
                                                                {index + 1}
                                                            </span>
                                                            <span className="text-gray-800 dark:text-gray-300">{shortcut}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}