'use client';

import { useState, useEffect, useRef } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PublicIcon from '@mui/icons-material/Public';
import WindowIcon from '@mui/icons-material/Window';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/(auth)/authSlice";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';


export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const { loggedIn } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("only screen and (max-width: 992px)").matches);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        setIsOpen(false);
        dispatch(logout());
        toast.success("Come Back Soon!");
        router.push("/");
    };

    const handleMenuClick = (type: string) => {
        if (type === "browser") router.push('/stream')
        else router.push('/windows/stream')
    };

    const handleDashboardClick = () => {
        if (!loggedIn) {
            router.push('/signin');
            return;
        }

        if (isMobile) {
            router.push('/signin');
        } else {
            setIsDropdownOpen(!isDropdownOpen);
        }
        setIsOpen(false);
    };


    return (
        <nav className="w-full relative z-50">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center min-w-max w-[60vw] h-20 bg-black dark:bg-white p-4 rounded-3xl shadow-md ml-[12rem] mt-10 gap-[100px] transition-colors duration-200">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="AntCloud"
                        width={100}
                        height={56}
                        className="w-[100px] h-[14vh] hidden dark:block"
                    />
                    <Image
                        src="/white-logo.png"
                        alt="AntCloud"
                        width={100}
                        height={56}
                        className="w-[100px] h-[14vh] dark:hidden"
                    />
                </Link>
                <ul className="flex items-center gap-[10vh] list-none ml-[8rem]">
                    <li className="text-lg font-semibold text-white dark:text-black">
                        <Link
                            href="/downloads"
                            className={`mr-4 inline-block relative group transform transition-all duration-500 ease-in-out hover:scale-110 ${pathname === "/downloads" ? "font-bold" : ""}`}
                        >
                            Downloads
                            <span className={`absolute bottom-0 left-0 w-0 h-[2.5px] bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] transition-all duration-500 ease-in-out origin-left ${pathname === "/downloads" ? "w-full" : "group-hover:w-full"}`}></span>
                        </Link>
                    </li>

                    <li className="text-lg font-semibold text-white dark:text-black">
                        <Link
                            href="/pricing"
                            className={`mr-4 inline-block relative group transform transition-all duration-500 ease-in-out hover:scale-110 ${pathname === "/pricing" ? "font-bold" : ""}`}
                        >
                            Pricing
                            <span className={`absolute bottom-0 left-0 w-0 h-[2.5px] bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] transition-all duration-500 ease-in-out origin-left ${pathname === "/pricing" ? "w-full" : "group-hover:w-full"}`}></span>
                        </Link>
                    </li>
                    <li className="text-lg font-semibold text-white dark:text-black">
                        <Link
                            href="/faq"
                            className={`mr-4 inline-block relative group transform transition-all duration-500 ease-in-out hover:scale-110 ${pathname === "/faq" ? "font-bold" : ""}`}
                        >
                            FAQs
                            <span className={`absolute bottom-0 left-0 w-0 h-[2.5px] bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] transition-all duration-500 ease-in-out origin-left ${pathname === "/faq" ? "w-full" : "group-hover:w-full"}`}></span>
                        </Link>
                    </li>

                    <li className="text-lg font-semibold text-white dark:text-black">
                        <Link
                            href="/support"
                            className={`mr-4 inline-block relative group transform transition-all duration-500 ease-in-out hover:scale-110 ${pathname === "/support" ? "font-bold" : ""}`}
                        >
                            Support
                            <span className={`absolute bottom-0 left-0 w-0 h-[2.5px] bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] transition-all duration-500 ease-in-out origin-left ${pathname === "/support" ? "w-full" : "group-hover:w-full"}`}></span>
                        </Link>
                    </li>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={handleDashboardClick}
                            className="rounded-3xl hover:scale-105 transition-all duration-300 ease-in-out dark:text-white text-black w-[120px] h-[7vh] text-md font-bold bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] hover:shadow-lg hover:shadow-[#05EBFB]/20"
                        >
                            {loggedIn ? 'Dashboard' : 'Start Now'}
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && !isMobile && loggedIn && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute top-full left-0 mt-3 w-48 rounded-2xl shadow-xl bg-black/95 dark:bg-white/95 backdrop-blur-md ring-1 ring-black/5 dark:ring-white/10 transform overflow-hidden origin-top"
                                >
                                    <div className="py-1.5" role="menu" aria-orientation="vertical">
                                        <motion.button
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.1, duration: 0.2 }}
                                            onClick={() => handleMenuClick('browser')}
                                            className="w-full text-left px-3 py-2.5 text-sm font-medium text-white dark:text-black hover:bg-white/10 dark:hover:bg-black/10 transition-colors duration-200 ease-in-out flex items-center gap-2.5 group"
                                            role="menuitem"
                                        >
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                <PublicIcon className="w-4 h-4 text-black dark:text-white" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold">Browser</span>
                                                <span className="text-[10px] text-gray-400 dark:text-gray-600">Access via Web</span>
                                            </div>
                                        </motion.button>
                                        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 dark:via-gray-300 to-transparent mx-3 my-0.5"></div>
                                        <motion.button
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.15, duration: 0.2 }}
                                            onClick={() => handleMenuClick('windows')}
                                            className="w-full text-left px-3 py-2.5 text-sm font-medium text-white dark:text-black hover:bg-white/10 dark:hover:bg-black/10 transition-colors duration-200 ease-in-out flex items-center gap-2.5 group"
                                            role="menuitem"
                                        >
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#DB19E5] to-[#05EBFB] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                <WindowIcon className="w-4 h-4 text-black dark:text-white" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold">Windows</span>
                                                <span className="text-[10px] text-gray-400 dark:text-gray-600">Access via Windows App</span>
                                            </div>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {loggedIn && (
                        <button
                            onClick={handleLogout}
                            className="rounded-3xl hover:scale-105 transition-all duration-300 ease-in-out dark:text-white text-black w-[6rem] h-[7vh] text-md font-bold bg-gradient-to-r from-[#DB19E5] to-[#05EBFB] hover:shadow-lg hover:shadow-[#DB19E5]/20 ml-[-2.5rem]"
                        >
                            Logout
                        </button>
                    )}
                </ul>
            </div>

            {/* Mobile Nav Bar */}
            <div className="flex md:hidden items-center justify-between px-4 py-4 bg-black dark:bg-white dark:bg-dark-bg-tertiary shadow-md rounded-[15px] mt-[1rem] w-[90%] ml-[1.2rem] z-50 h-[4rem] transition-colors duration-200">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="AntCloud"
                        width={80}
                        height={45}
                        className="w-[80px] hidden dark:block"
                    />
                    <Image
                        src="/white-logo.png"
                        alt="AntCloud"
                        width={80}
                        height={45}
                        className="w-[80px] dark:hidden"
                    />
                </Link>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen
                            ? <CloseIcon className="text-white dark:text-black" />
                            : <MenuIcon className="text-white dark:text-black" />}
                    </button>
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Drawer-style Mobile Menu */}
            <div
                className={`
                    fixed top-0 right-0 h-full w-[50%] max-w-[300px] bg-black dark:bg-white dark:bg-dark-bg-tertiary shadow-lg z-40 p-8 pt-[5rem] rounded-l-2xl
                    transition-all duration-500 ease-in-out overflow-y-auto
                    ${isOpen ? 'right-0' : 'right-[-100%]'}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                <ul className="flex flex-col gap-6 items-start">
                    <li className="text-base font-semibold text-white dark:text-black hover:cursor-pointer">
                        <Link
                            href="/downloads"
                            className={`mr-4 inline-block relative group transform transition-all duration-500 ease-in-out hover:scale-110 ${pathname === "/downloads" ? "font-bold" : ""}`}
                            onClick={handleLinkClick}
                        >
                            Downloads
                            <span className={`absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] transition-all duration-500 ease-in-out origin-left ${pathname === "/downloads" ? "w-full" : "group-hover:w-full"}`}></span>
                        </Link>
                    </li>
                    <li className="text-base font-semibold text-white dark:text-black hover:cursor-pointer">
                        <Link
                            href="/pricing"
                            className={`mr-4 inline-block relative group transform transition-all duration-500 ease-in-out hover:scale-110 ${pathname === "/pricing" ? "font-bold" : ""}`}
                            onClick={handleLinkClick}
                        >
                            Pricing
                            <span className={`absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] transition-all duration-500 ease-in-out origin-left ${pathname === "/pricing" ? "w-full" : "group-hover:w-full"}`}></span>
                        </Link>
                    </li>
                    <li className="text-base font-semibold text-white dark:text-black hover:cursor-pointer">
                        <Link
                            href="/faq"
                            className={`mr-4 inline-block relative group transform transition-all duration-500 ease-in-out hover:scale-110 ${pathname === "/faq" ? "font-bold" : ""}`}
                            onClick={handleLinkClick}
                        >
                            FAQs
                            <span className={`absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] transition-all duration-500 ease-in-out origin-left ${pathname === "/faq" ? "w-full" : "group-hover:w-full"}`}></span>
                        </Link>
                    </li>

                    <li className="text-base font-semibold text-white dark:text-black hover:cursor-pointer">
                        <Link
                            href="/support"
                            className={`mr-4 inline-block relative group transform transition-all duration-500 ease-in-out hover:scale-110 ${pathname === "/support" ? "font-bold" : ""}`}
                            onClick={handleLinkClick}
                        >
                            Support
                            <span className={`absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] transition-all duration-500 ease-in-out origin-left ${pathname === "/support" ? "w-full" : "group-hover:w-full"}`}></span>
                        </Link>
                    </li>
                    {!loggedIn && (
                        <button
                            onClick={handleDashboardClick}
                            className="rounded-3xl hover:scale-105 transition-all duration-300 ease-in-out text-white w-[8rem] h-[5vh] text-sm font-semibold bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] hover:shadow-lg hover:shadow-[#05EBFB]/20"
                        >
                            Start Now
                        </button>
                    )}
                    {loggedIn && (
                        <button
                            onClick={handleLogout}
                            className="rounded-3xl hover:scale-105 transition-all duration-300 ease-in-out text-white w-[8rem] h-[5vh] text-sm font-semibold bg-gradient-to-r from-[#DB19E5] to-[#05EBFB] hover:shadow-lg hover:shadow-[#DB19E5]/20 mt-4"
                        >
                            Logout
                        </button>
                    )}
                </ul>
            </div>
        </nav>
    );
}         