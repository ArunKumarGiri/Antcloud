"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Image from 'next/image';

const Footer = () => {
    const pathname = usePathname();

    const handleJoinClick = () => {
        window.open('https://discord.com/invite/fZRwkKwZQB', '_blank');
    };

    return (
        <div className='w-full h-full cursor-default flex flex-col bg-gradient-to-b from-gray-300 to-gray-200 dark:from-[#272727] dark:to-[#272727] transition-colors duration-200'>
            {/* Discord Banner */}
            <div
                className='z-10 w-full px-4 py-3 sm:h-[4rem] flex lg:flex-row sm:flex-row justify-center gap-2 sm:gap-3 text-base lg:text-[1.3rem] text-[14px] font-semibold items-center lg:text-center text-white bg-[#5B209A]'
                onClick={() => {
                    if (window.innerWidth < 640) {
                        window.open('https://discord.com/invite/fZRwkKwZQB', '_blank');
                    }
                }}
            >
                <div className='flex items-center justify-center gap-2'>
                    <span>Join our</span>
                    <img
                        src="/Brands/discord.png"
                        alt="Discord"
                        className='h-4 w-5 sm:w-[1.5vw] sm:h-[2.4vh]'
                    />
                    <span>Discord for Latest Updates</span>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent parent click
                        handleJoinClick();
                    }}
                    className='rounded-2xl w-15 sm:w-[10rem] bg-white text-black text-[13px] sm:text-[17px] font-semibold h-6 sm:h-[2rem] hover:scale-105 transition-transform duration-150 ease-linear'
                >
                    Join
                </button>
            </div>


            {/* Footer Links */}
            <div className='w-full h-auto sm:h-[23rem] flex flex-col sm:flex-row justify-center lg:ml-0 ml-[1rem]'>
                <div className='w-full px-4 sm:w-[80%] mt-[3rem] flex gap-8 sm:gap-[10rem] justify-center text-gray-800 dark:text-gray-300 transition-colors duration-200 '>

                    {/* Navigation */}
                    <ul className='lg:text-left sm:text-left space-y-0.5'>
                        <li className='font-bold text-[1rem] lg:text-xl text-gray-900 dark:text-white transition-all duration-300'>Navigation</li>
                        <li className={`mt-[1.5rem] text-[14px] lg:text-[16px] text-gray-700 dark:text-gray-400 ${pathname === '/' ? 'text-black dark:text-white' : ''} transition-all duration-300 hover:text-black dark:hover:text-white hover:translate-x-1`}>
                            <Link href="/">Home</Link>
                        </li>
                        <li className={`text-[14px] lg:text-[16px] text-gray-700 dark:text-gray-400 ${pathname === '/downloads' ? 'text-black dark:text-white' : ''} transition-all duration-300 hover:text-black dark:hover:text-white hover:translate-x-1`}>
                            <Link href="/downloads">Downloads</Link>
                        </li>
                        <li className={`text-[14px] lg:text-[16px] text-gray-700 dark:text-gray-400 ${pathname === '/pricing' ? 'text-black dark:text-white' : ''} transition-all duration-300 hover:text-black dark:hover:text-white hover:translate-x-1`}>
                            <Link href="/pricing">Pricing</Link>
                        </li>
                        <li className={`text-[14px] lg:text-[16px] text-gray-700 dark:text-gray-400 ${pathname === '/support' ? 'text-black dark:text-white' : ''} transition-all duration-300 hover:text-black dark:hover:text-white hover:translate-x-1`}>
                            <Link href="/support">Support</Link>
                        </li>
                        <li className={`text-[14px] lg:text-[16px] text-gray-700 dark:text-gray-400 ${pathname === '/store' ? 'text-black dark:text-white' : ''} transition-all duration-300 hover:text-black dark:hover:text-white hover:translate-x-1`}>
                            <Link href="/store">Store</Link>
                        </li>
                        <li className={`text-[14px] lg:text-[16px] text-gray-700 dark:text-gray-400 ${pathname === '/dashboard' ? 'text-black dark:text-white' : ''} transition-all duration-300 hover:text-black dark:hover:text-white hover:translate-x-1`}>
                            <Link href="/dashboard">Dashboard</Link>
                        </li>
                        <li className={`text-[14px] lg:text-[16px] text-gray-700 dark:text-gray-400 ${pathname === '/dashboard' ? 'text-black dark:text-white' : ''} transition-all duration-300 hover:text-black dark:hover:text-white hover:translate-x-1`}>
                            <Link href="/windows/guide">Windows Guide</Link>
                        </li>
                        <li className={`text-[14px] lg:text-[16px] text-gray-700 dark:text-gray-400 ${pathname === '/dashboard' ? 'text-black dark:text-white' : ''} transition-all duration-300 hover:text-black dark:hover:text-white hover:translate-x-1`}>
                            <Link href="/controllermapping">Controller Mapping</Link>
                        </li>
                    </ul>


                    {/* Business */}
                    <ul className='lg:text-left sm:text-left space-y-0.5'>
                        <li className='font-bold text-[1rem] lg:text-xl text-gray-900 dark:text-white transition-all duration-300'>Business</li>
                        <li className={`mt-[1.5rem] text-[14px] lg:text-[16px] text-gray-700 dark:text-gray-400 ${pathname === '/careers' ? 'text-black dark:text-white' : ''} transition-all duration-300 hover:text-black dark:hover:text-white hover:translate-x-1`}>
                            <Link href="https://www.linkedin.com/company/antcloud/jobs/?viewAsMember=true" target="_blank" rel="noopener noreferrer">Careers</Link>
                        </li>
                        <li className={`text-[14px] lg:text-[16px] text-gray-700 dark:text-gray-400 ${pathname === '/enterprise' ? 'text-black dark:text-white' : ''} transition-all duration-300 hover:text-black dark:hover:text-white hover:translate-x-1`}>
                            <Link href="/enterprise">Enterprise Plans</Link>
                        </li>
                        <li className={`text-[14px] lg:text-[16px] text-gray-700 dark:text-gray-400 ${pathname === '/sales' ? 'text-black dark:text-white' : ''} transition-all duration-300 hover:text-black dark:hover:text-white hover:translate-x-1`}>
                            <Link href="https://calendly.com/garv-antcloud/30min" target="_blank" rel="noopener noreferrer">Talk to Sales</Link>
                        </li>
                    </ul>

                    {/* Legal Stuff */}
                    <ul className='lg:text-left sm:text-left space-y-0.5'>
                        <li className='font-bold text-[1rem] lg:text-xl text-gray-900 dark:text-white transition-all duration-300'>Legal Stuff</li>
                        <li className={`mt-[1.5rem] text-[14px] lg:text-[16px] text-gray-700 dark:text-gray-400 ${pathname === '/privacy-policy' ? 'text-black dark:text-white' : ''} transition-all duration-300 hover:text-black dark:hover:text-white hover:translate-x-1`}>
                            <Link href="/privacy-policy">Privacy Policy</Link>
                        </li>
                        <li className={`text-[14px] lg:text-[16px] text-gray-700 dark:text-gray-400 ${pathname === '/refund' ? 'text-black dark:text-white' : ''} transition-all duration-300 hover:text-black dark:hover:text-white hover:translate-x-1`}>
                            <Link href="/refund-policy">Refund and Cancellation Policy</Link>
                        </li>
                        <li className={`text-[14px] lg:text-[16px] text-gray-700 dark:text-gray-400 ${pathname === '/terms-and-conditions' ? 'text-black dark:text-white' : ''} transition-all duration-300 hover:text-black dark:hover:text-white hover:translate-x-1`}>
                            <Link href="/terms-and-conditions">Terms and Conditions</Link>
                        </li>
                        <li className={`text-[14px] lg:text-[16px] text-gray-700 dark:text-gray-400 ${pathname === '/shipping-policy' ? 'text-black dark:text-white' : ''} transition-all duration-300 hover:text-black dark:hover:text-white hover:translate-x-1`}>
                            <Link href="/shipping-policy">Shipping Policy</Link>
                        </li>
                        <li className={`text-[14px] lg:text-[16px] text-gray-700 dark:text-gray-400 ${pathname === '/disclaimer' ? 'text-black dark:text-white' : ''} transition-all duration-300 hover:text-black dark:hover:text-white hover:translate-x-1`}>
                            <Link href="/disclaimer">Disclaimer</Link>
                        </li>
                    </ul>
                </div>

                {/* Footer Images */}
                <div className='lg:flex w-[30%] hidden h-auto lg:flex-col'>
                    <Image
                        src="/white-logo.png"
                        alt="AntCloud"
                        width={160}
                        height={160}
                        className='w-[6rem] lg:ml-0 ml-[7rem] lg:w-[10rem] lg:h-[10rem] lg:mt-[1rem] hidden dark:block'
                    />
                    <Image
                        src="/logo.png"
                        alt="AntCloud"
                        width={160}
                        height={160}
                        className='w-[6rem] ml-[7rem] lg:ml-0 lg:w-[10rem] lg:h-[10rem] lg:mt-[1rem] dark:hidden'
                    />
                    <div className='lg:flex gap-3.5 lg:mt-0 hidden lg:ml-[1rem] ml-[2rem] mt-[2rem]'>
                        <a href="https://www.youtube.com/channel/UCxcqbWaOReR9O9PlTneYqAQ" target="_blank" rel="noopener noreferrer" className="transform transition-all duration-300 hover:scale-110 hover:text-[#60A5FA]">
                            <YouTubeIcon fontSize='medium' className="text-gray-800 dark:text-white transition-colors duration-300" />
                        </a>
                        <a href="https://www.instagram.com/antcloudco/#" target="_blank" rel="noopener noreferrer" className="transform transition-all duration-300 hover:scale-110 hover:text-[#F472B6]">
                            <InstagramIcon fontSize='medium' className="text-gray-800 dark:text-white transition-colors duration-300" />
                        </a>
                        <a href="https://www.linkedin.com/company/antcloud/" target="_blank" rel="noopener noreferrer" className="transform transition-all duration-300 hover:scale-110 hover:text-[#60A5FA]">
                            <LinkedInIcon fontSize='medium' className="text-gray-800 dark:text-white transition-colors duration-300" />
                        </a>
                        <a href="https://www.facebook.com/AntPlay.tech/" target="_blank" rel="noopener noreferrer" className="transform transition-all duration-300 hover:scale-110 hover:text-[#60A5FA]">
                            <FacebookIcon fontSize='medium' className="text-gray-800 dark:text-white transition-colors duration-300" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Mobile logo and social icons */}
            <div className='flex flex-col  h-[25rem] lg:ml-0 items-center lg:hidden mt-[-1rem] mb-8'>
                <Image
                    src="/white-logo.png"
                    alt="AntCloud"
                    width={96}
                    height={96}
                    className='w-24 h-24 hidden dark:block'
                />
                <Image
                    src="/logo.png"
                    alt="AntCloud"
                    width={96}
                    height={96}
                    className='w-24 h-24 dark:hidden'
                />
                <div className='flex gap-4'>
                    <a href="https://www.youtube.com/channel/UCxcqbWaOReR9O9PlTneYqAQ" target="_blank" rel="noopener noreferrer" className="transform transition-all duration-300 hover:scale-110 hover:text-[#60A5FA]">
                        <YouTubeIcon fontSize='medium' className="text-gray-800 dark:text-white transition-colors duration-300" />
                    </a>
                    <a href="https://www.instagram.com/antcloudco/#" target="_blank" rel="noopener noreferrer" className="transform transition-all duration-300 hover:scale-110 hover:text-[#F472B6]">
                        <InstagramIcon fontSize='medium' className="text-gray-800 dark:text-white transition-colors duration-300" />
                    </a>
                    <a href="https://www.linkedin.com/company/antcloud/" target="_blank" rel="noopener noreferrer" className="transform transition-all duration-300 hover:scale-110 hover:text-[#60A5FA]">
                        <LinkedInIcon fontSize='medium' className="text-gray-800 dark:text-white transition-colors duration-300" />
                    </a>
                    <a href="https://www.facebook.com/AntPlay.tech/" target="_blank" rel="noopener noreferrer" className="transform transition-all duration-300 hover:scale-110 hover:text-[#60A5FA]">
                        <FacebookIcon fontSize='medium' className="text-gray-800 dark:text-white transition-colors duration-300" />
                    </a>
                </div>
            </div>
            <div className='justify-center text-center w-full lg:h-auto h-auto '>
                <p className='font-light lg:text-[13px] text-[12px] lg:p-0 text-gray-700 dark:text-gray-400 transition-colors duration-200'>Made with ❤️ by Ant-E Sports Private Limited &#169; 2025</p>
            </div>
        </div>
    )
}

export default Footer